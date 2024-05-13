import streamlit as st
from toolbox.demos.sidebar import render_sidebar
from toolbox.mytools.llm_settings import LlmSettings
from toolbox.mytools.cnn_news_crawler import CNNNewsCrawler
from toolbox.modules.llm_settings_ui import LlmSettingsUI
from toolbox.modules.send_request_ui import SendRequestUi
from toolbox.modules.cnn_news_crawler_ui import CNNNewsCrawlerUi
from st_pages import add_page_title


def init():
    if "cnn_crawler" not in st.session_state:
        st.session_state.cnn_crawler = CNNNewsCrawler()

    st.write(f"{len(st.session_state.cnn_crawler.documents)} Documents loaded.")
    tab1, tab2, tab3 = st.tabs(["Manage Docs", "Scrape News", "Load from PDF"])

    with tab1:
        st.write("Manage Documents")

    with tab2:
        render(st.session_state.cnn_crawler)


def render(model):
    ui = CNNNewsCrawlerUi(model)
    ui.render()


add_page_title()
init()
render_sidebar()
