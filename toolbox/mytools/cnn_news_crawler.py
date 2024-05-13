from unstructured.partition.html import partition_html
from llama_index.readers.web import UnstructuredURLLoader
import streamlit as st


# Crawls the lite cnn website and returns the latest 90-100 news articles
class CNNNewsCrawler:
    def __init__(self, st_progress_bar=None):
        self.url = "https://lite.cnn.com/"
        self.links_to_article = []
        self.documents = []
        self.st_progress_bar = st_progress_bar

    def get_links(self):
        news = partition_html(url=self.url)
        links = [
            f"{self.url}/{element.metadata.link_urls[0][1:]}"
            for element in news
            if element.metadata.link_urls
            and element.metadata.link_urls[0][1:].startswith("2024")
        ]

        self.links_to_article = links
        return links

    def load_articles(self, amount):
        articles = []
        total_links = len(self.links_to_article)
        amount = min(
            amount, total_links
        )  # Ensure we don't exceed the total number of links

        for index, link in enumerate(self.links_to_article[:amount]):
            loader = UnstructuredURLLoader(urls=[link])
            article = loader.load_data()
            articles.extend(article)

            if self.st_progress_bar:
                progress_percent = (index + 1) / amount
                self.st_progress_bar.progress(
                    progress_percent, "Downloading articles..."
                )

        self.documents = articles
        return articles


if __name__ == "__main__":
    crawler = CNNNewsCrawler()
    links = crawler.get_links()
    articles = crawler.load_articles(2)
    print(articles)
    print(links)
