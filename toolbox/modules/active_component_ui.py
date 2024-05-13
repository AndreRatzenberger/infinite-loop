import streamlit as st


class ActiveComponentsUi:
    def __init__(self, settings):
        self.settings = settings

    def render(self):
        st.caption("Settings")
        st.caption(f"Active LLM: {self.settings.llm}")
        st.caption(f"Active DocStore: {self.settings.doc_store}")
