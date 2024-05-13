import streamlit as st
from toolbox.mytools.cnn_news_crawler import CNNNewsCrawler


class CNNNewsCrawlerUi:
    def __init__(self, crawler: CNNNewsCrawler):
        self.cnn_news_crawler = crawler

    def render(self):
        st.write("### CNN News Crawler")
        st.write("Downloads CNN news and converts those into **llama-index** documents")

        if len(self.cnn_news_crawler.links_to_article) > 0:
            self._render_article_download()
            self._render_link_list()

        if st.button("Get links", use_container_width=True):
            self.cnn_news_crawler.get_links()
            st.rerun()

    def _render_article_download(self):
        amount = st.number_input("Amount of articles to download", 1, 100)
        progress = st.progress(0)
        if st.button("Download articles", use_container_width=True):
            self.cnn_news_crawler.st_progress_bar = progress
            self.cnn_news_crawler.load_articles(amount)
            st.rerun()

    def _render_link_list(self):
        st.write("Collected Links")
        st.dataframe(self.cnn_news_crawler.links_to_article, use_container_width=True)
