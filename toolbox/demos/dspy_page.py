import streamlit as st
from toolbox.demos.sidebar import render_sidebar
from toolbox.modules.interactive_dspy_demo_ui import InteractiveDSPyDemoUi
from toolbox.mytools.active_component_settings import ActiveComponentSettings
from toolbox.mytools.interactive_dspy_demo import InteractiveDSPyDemo
from toolbox.mytools.llm_settings import LlmSettings
from toolbox.mytools.cnn_news_crawler import CNNNewsCrawler
from toolbox.modules.llm_settings_ui import LlmSettingsUI
from toolbox.modules.send_request_ui import SendRequestUi
from toolbox.modules.cnn_news_crawler_ui import CNNNewsCrawlerUi
from st_pages import add_page_title


def init():
    tab1, tab2 = st.tabs(["-> Signature", "class based Signature"])

    # Create OPENAI settings view+model
    with tab1:
        render(1)


def render(mode):
    if st.session_state.active_components:
        ui = InteractiveDSPyDemoUi(st.session_state.active_components.llm, mode)
        ui.render()


add_page_title()
if "active_components" not in st.session_state:
    st.session_state.active_components = ActiveComponentSettings()
init()
render_sidebar()
