import requests
from bs4 import BeautifulSoup as bs
from urllib.parse import urlparse
import warnings
import re
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

warnings.filterwarnings("ignore", message="Unverified HTTPS request is being made")

# Lista de dominios excluidos
excluded_domains = ['facebook.com', 'instagram.com', 'twitter.com', 'youtube.com']

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def get_data(url):
    """Extrae enlaces de noticias desde la página principal."""
    print(f"Procesando: {url}")
    try:
        session = requests.Session()
        res = session.get(url, headers=headers, verify=False, timeout=10)
        res.raise_for_status()
        
        soup = bs(res.text, 'lxml')
        results = soup.find_all('a')
        urls_set = set()
        
        for result in results:
            src = result.get('href', '')
            if src and src.startswith(('http://', 'https://')):
                parsed_url = urlparse(src)
                domain = parsed_url.netloc.lower()
                if not any(domain.endswith(excluded) for excluded in excluded_domains):
                    urls_set.add(src)
        
        return list(urls_set)
    except requests.RequestException as e:
        print(f"Error al acceder a {url}: {e}")
        return []

def extract_date_from_url(url):
    """Extrae la fecha de la URL si está en formato /YYYY/MM/DD/, de lo contrario usa la actual."""
    date_pattern = re.compile(r'/(\d{4})/(\d{2})/(\d{2})/')
    match = date_pattern.search(url)
    if match:
        year, month, day = match.groups()
        return f"{day}/{month}/{year}"
    return datetime.now().strftime("%d/%m/%Y")

def extract_news_data(news_url):
    """Extrae datos de una noticia incluyendo título, fecha, descripción y contenido."""
    try:
        session = requests.Session()
        res = session.get(news_url, headers=headers, verify=False, timeout=10)
        res.raise_for_status()
        soup = bs(res.text, 'lxml')

        title = (soup.find('h1') or soup.find('h2') or soup.find('title'))
        title = title.get_text(strip=True) if title else 'No title found'
        
        date_from_url = extract_date_from_url(news_url)
        
        date_tag = soup.find('time') or soup.find('meta', {'property': 'article:published_time'})
        date_from_page = date_tag.get_text(strip=True) if date_tag and date_tag.get_text() else 'No date found'
        
        description_tag = (soup.find('meta', {'name': 'description'}) or
                           soup.find('meta', {'property': 'og:description'}))
        description = description_tag['content'] if description_tag else 'No description found'
        
        content_elements = soup.find_all(['p', 'div'], class_=lambda x: x and 'content' in x)
        content = ' '.join([elem.get_text(strip=True) for elem in content_elements]) if content_elements else 'No content found'
        
        return {
            'title': title,
            'date_from_url': date_from_url,
            'date_from_page': date_from_page,
            'description': description,
            'content': content,
            'url': news_url
        }
    except requests.RequestException as e:
        print(f"Error al acceder a {news_url}: {e}")
        return None

def process_news_urls(urls):
    """Procesa una lista de URLs de noticias en paralelo y extrae información relevante."""
    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(extract_news_data, urls))
    return [result for result in results if result]