import streamlit as st
from mytools.llm_settings import LlmSettings
from modules.llm_settings_ui import SettingsUI
from modules.send_request_ui import SendRequestUi


def main():
    st.title("LLM Settings Manager")

    tab1, tab2, tab3 = st.tabs(["OPENAI", "GROQ", "OLLAMA"])

    # Create OPENAI settings view+model
    with tab1:
        settings = LlmSettings(name="OPENAI")
        ui = SettingsUI(settings)
        ui.render()

        request_ui = SendRequestUi(settings)
        request_ui.render()

    # Create GROQ settings view+model
    # create dict of available models
    with tab2:
        models = {"LLAMA3_8B": "llama3-8b-8192", "LLAMA3_70B": "llama3-70b-8192"}
        embeddings = {"NO_MODEL": "n/a"}
        settings = LlmSettings(
            name="GROQ",
            models=models,
            embedding_models=embeddings,
            url="https://api.groq.com/openai/v1",
        )
        ui = SettingsUI(settings)
        ui.render()

    with tab3:
        models = {"NO_MODEL": "n/a"}  # define your local OLLAMA Models
        embeddings = {"NO_MODEL": "n/a"}  # define your local OLLAMA Models
        settings = LlmSettings(
            name="OLLAMA",
            models=models,
            embedding_models=embeddings,
            url="http://127.0.0.1:122344/openai/v1",
        )
        ui = SettingsUI(settings)
        ui.render()


if __name__ == "__main__":
    main()
