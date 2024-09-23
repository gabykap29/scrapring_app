import requests
from bs4 import BeautifulSoup as bs
from urllib.parse import urlparse
import warnings
import re
from datetime import datetime

# Suprimir advertencias por certificados no verificados
warnings.filterwarnings("ignore", message="Unverified HTTPS request is being made")

# Lista de dominios que quieres excluir
excluded_domains = ['facebook.com', 'instagram.com', 'twitter.com', 'youtube.com']

# Configura el User-Agent
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def es_url_de_noticias(url):
    parsed_url = urlparse(url)
    return parsed_url.netloc == 'www.noticiasformosa.com.ar' and (
        '/2024/' in parsed_url.path or '/category/' in parsed_url.path
    )

def get_data(url):
    print(f"Procesando: {url}")
    try:
        # Realizar la solicitud HTTP
        res = requests.get(url, headers=headers, verify=False)
        res.raise_for_status()  # Verificar si la solicitud fue exitosa
        
        # Parsear el contenido HTML
        soup = bs(res.text, 'html.parser')
        results = soup.find_all('a')
        
        urls_set = set()  # Usar un conjunto para evitar duplicados
        
        for result in results:
            src = result.get('href', '')
            if src and src.startswith(('http://', 'https://')):
                parsed_url = urlparse(src)
                domain = parsed_url.netloc.lower()
                
                # Excluir dominios no deseados
                if not any(domain.endswith(excluded) for excluded in excluded_domains):
                    if es_url_de_noticias(src):
                        urls_set.add(src)  # Evitar duplicados
        
        # Convertir el conjunto a lista
        array = list(urls_set)
        print(array)
        return array
    
    except requests.RequestException as e:
        print(f"Error al acceder a la URL principal: {e}")
        return []

def extract_date_from_url(url):
    """Extrae la fecha de la URL si está disponible en el formato /YYYY/MM/DD/, o usa la fecha actual como predeterminada."""
    # Patrón para buscar la fecha en el formato /YYYY/MM/DD/
    date_pattern = re.compile(r'/(\d{4})/(\d{2})/(\d{2})/')
    
    # Buscar coincidencias en la URL
    match = date_pattern.search(url)
    
    if match:
        # Si se encuentra la fecha, extraerla
        year, month, day = match.groups()
        return f"{day}/{month}/{year}"
    else:
        # Si no se encuentra, usar la fecha actual
        current_date = datetime.now()
        return current_date.strftime("%d/%m/%Y")
    
    
def extract_news_data(news_url):
    try:
        # Realizar la solicitud HTTP
        res = requests.get(news_url, headers=headers, verify=False)
        res.raise_for_status()
        
        # Parsear el contenido HTML
        soup = bs(res.text, 'html.parser')
        
        # Extraer el título
        title = soup.find('h1').get_text(strip=True) if soup.find('h1') else 'No title found'
        
        # Extraer la fecha de la URL
        date_from_url = extract_date_from_url(news_url)
        
        # Extraer la fecha de la página, si está presente
        date_from_page = soup.find('time').get_text(strip=True) if soup.find('time') else 'No date found'
        
        # Extraer la descripción
        description = soup.find('meta', {'name': 'description'})
        description = description.get('content', '') if description else 'No description found'
        
        # Extraer el contenido
        content_elements = soup.find_all('p')
        content = ' '.join([p.get_text(strip=True) for p in content_elements]) if content_elements else 'No content found'
        
        # Devolver los datos extraídos
        return {
            'title': title,
            'date_from_url': date_from_url,  # Fecha extraída de la URL
            'date_from_page': date_from_page,  # Fecha extraída de la página
            'description': description,
            'content': content,
            'url': news_url
        }
    
    except requests.RequestException as e:
        print(f"Error al acceder a la URL de la noticia {news_url}: {e}")
        return None

def process_news_urls(urls):
    news_data = []
    
    for url in urls:
        data = extract_news_data(url)
        if data:
            news_data.append(data)
    
    return news_data
