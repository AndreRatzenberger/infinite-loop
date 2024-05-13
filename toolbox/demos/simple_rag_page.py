import streamlit as st
from toolbox.demos.sidebar import render_sidebar
from toolbox.mytools.llm_settings import LlmSettings
from toolbox.mytools.cnn_news_crawler import CNNNewsCrawler
from toolbox.modules.llm_settings_ui import SettingsUI
from toolbox.modules.send_request_ui import SendRequestUi
from toolbox.modules.cnn_news_crawler_ui import CNNNewsCrawlerUi


def init():
    if "cnn_crawler" not in st.session_state:
        st.session_state.cnn_crawler = CNNNewsCrawler()

    st.title("Simple RAG")
    st.write(f"{len(st.session_state.cnn_crawler.documents)} Documents loaded.")
    tab1, tab2, tab3 = st.tabs(["Get Content", "Vectorize", "Query"])

    # Create OPENAI settings view+model
    with tab1:
        render(st.session_state.cnn_crawler)


def render(model):
    ui = CNNNewsCrawlerUi(model)
    ui.render()


init()
render_sidebar()
