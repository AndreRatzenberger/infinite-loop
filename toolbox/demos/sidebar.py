import streamlit as st
from toolbox.modules.active_component_ui import ActiveComponentsUi


def render_sidebar():
    with st.sidebar:
        ActiveComponentsUi(st.session_state.active_components).render()
        if st.session_state.llama_index_docs:
            st.caption(f"{len(st.session_state.llama_index_docs)} llama-index docs")
