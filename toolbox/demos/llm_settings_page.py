import streamlit as st
from toolbox.mytools.llm_settings import LlmSettings
from toolbox.modules.llm_settings_ui import SettingsUI
from toolbox.modules.send_request_ui import SendRequestUi


def llm_settings_page():
    st.title("LLM Settings Manager")

    tab1, tab2, tab3 = st.tabs(["OPENAI", "GROQ", "OLLAMA"])

    # Create OPENAI settings view+model
    with tab1:
        settings = LlmSettings(name="OPENAI")
        render(settings)

    # Create GROQ settings view+model
    # create dict of available models
    with tab2:
        embeddings = {"NO_MODEL": "n/a"}
        models = {"LLAMA3_8B": "llama3-8b-8192", "LLAMA3_70B": "llama3-70b-8192"}
        settings = LlmSettings(
            name="GROQ",
            models=models,
            embedding_models=embeddings,
            url="https://api.groq.com/openai/v1",
        )
        render(settings)

    with tab3:
        models = {
            "LLAMA3-8B": "llama3:8b-instruct-q8_0",
            "CODEQWEN": "codeqwen:7b-chat-v1.5-q8_0",
        }  # define your local OLLAMA Models
        embeddings = {
            "MAXBAI": "mxbai-embed-large:latest"
        }  # define your local OLLAMA Models
        settings = LlmSettings(
            name="OLLAMA",
            models=models,
            embedding_models=embeddings,
            url="http://localhost:11434/v1",
            api_key="ollama",
        )
        render(settings)


def render(settings):
    ui = SettingsUI(settings)
    ui.render()

    request_ui = SendRequestUi(settings)
    request_ui.render()
