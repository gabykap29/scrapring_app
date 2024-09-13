import requests
from bs4 import BeautifulSoup as bs
from urllib.parse import urlparse

# Lista de dominios que quieres excluir
excluded_domains = ['facebook.com', 'instagram.com', 'twitter.com', 'youtube.com']

def es_url_de_noticias(url):
    # Verifica si el dominio es noticiasformosa.com.ar
    parsed_url = urlparse(url)
    if parsed_url.netloc != 'www.noticiasformosa.com.ar':
        return False
    
    # Verifica si la URL contiene '/2024/' o '/category/' para identificar noticias
    return '/2024/' in parsed_url.path or '/category/' in parsed_url.path

def get_data(url):
    print(url)
    try:
        # Realizar la solicitud HTTP
        res = requests.get(url, verify=False)
        res.raise_for_status()  # Verificar si la solicitud fue exitosa
        
        # Parsear el contenido HTML
        soup = bs(res.text, 'html.parser')
        results = soup.find_all('a')
        
        urls_set = set()  # Usar un conjunto para evitar duplicados
        
        for result in results:
            src = result.get('href', '')
            if src and src.startswith(('http://', 'https://')):
                # Parsear la URL para obtener el dominio
                parsed_url = urlparse(src)
                domain = parsed_url.netloc
                
                # Normalizar el dominio y verificar si está en la lista de dominios excluidos
                normalized_domain = domain.lower()
                if not any(normalized_domain.endswith(excluded_domain) for excluded_domain in excluded_domains):
                    if es_url_de_noticias(src):
                        urls_set.add(src)  # Agregar al conjunto (automáticamente evita duplicados)
        
        # Convertir el conjunto a lista
        array = list(urls_set)
        
        # Imprimir y retornar la lista de URLs
        print(array)
        return array
    
    except requests.RequestException as e:
        print(f"Error al acceder a la URL principal: {e}")
        return []

# Función para extraer los datos de una noticia
def extract_news_data(news_url):
    try:
        # Realizar la solicitud HTTP
        res = requests.get(news_url, verify=False)
        res.raise_for_status()  # Verificar si la solicitud fue exitosa
        
        # Parsear el contenido HTML
        soup = bs(res.text, 'html.parser')
        
        # Extraer el título
        title = soup.find('h1').get_text(strip=True) if soup.find('h1') else 'No title found'
        
        # Extraer la fecha
        date = soup.find('time').get_text(strip=True) if soup.find('time') else 'No date found'
        
        # Extraer la descripción
        description = soup.find('meta', {'name': 'description'})
        description = description.get('content', '') if description else 'No description found'
        
        # Extraer el contenido
        content_elements = soup.find_all('p')
        content = ' '.join([p.get_text(strip=True) for p in content_elements]) if content_elements else 'No content found'
        
        # Devolver los datos extraídos
        return {
            'title': title,
            'date': date,
            'description': description,
            'content': content,
            'url': news_url
        }
    
    except requests.RequestException as e:
        print(f"Error al acceder a la URL de la noticia {news_url}: {e}")
        return None

# Función para procesar todas las URLs y extraer las noticias
def process_news_urls(urls):
    news_data = []
    
    for url in urls:
        data = extract_news_data(url)
        if data:
            news_data.append(data)
    
    return news_data