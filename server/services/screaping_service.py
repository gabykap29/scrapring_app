import requests
from bs4 import BeautifulSoup as bs
from urllib.parse import urlparse

# URL principal para realizar el scraping
url = "https://www.noticiasformosa.com.ar/"

# Lista de dominios que quieres excluir
excluded_domains = ['facebook.com', 'instagram.com', 'twitter.com', 'youtube.com']

def get_data():
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
                
                # Filtrar dominios excluidos
                if not any(domain.endswith(excluded_domain) for excluded_domain in excluded_domains):
                    urls_set.add(src)  # Agregar al conjunto (automáticamente evita duplicados)
        
        # Convertir el conjunto a lista
        array = list(urls_set)
        
        # Imprimir y retornar la lista de URLs
        print(array)
        return array
    
    except requests.RequestException as e:
        print(f"Error al acceder a la URL principal: {e}")
        return []

# Llamar a la función para probarla
get_data()
