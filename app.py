import streamlit as st
from st_pages import Page, Section, add_page_title, show_pages
from toolbox.mytools.active_component_settings import ActiveComponentSettings
from toolbox.modules.active_component_ui import ActiveComponentsUi
from toolbox.demos.sidebar import render_sidebar


show_pages(
    [
        Page("app.py", "Home", "🏠"),
        Page("toolbox/demos/llm_settings_page.py", "LLM Settings", "🔧"),
        Page(
            "toolbox/demos/doc_storage_settings_page.py",
            "Doc Store Settings",
            "🔧",
        ),
        Section(name="llama-index", icon=":book:"),
        Page("toolbox/demos/simple_rag_page.py", "Doc Ingestion"),
        Section(name="DSPy", icon=":book:"),
        Page("toolbox/demos/dspy_page.py", "DSPy Signatures"),
    ]
)
add_page_title()


def init_vars():
    # Simulate bootstrapping streamlit style
    if "active_components" not in st.session_state:
        st.session_state.active_components = ActiveComponentSettings()
    if "llama_index_docs" not in st.session_state:
        st.session_state.llama_index_docs = []


def intro():
    st.markdown(
        """
        ## Welcome to the infinite-loop tool box!
        
        This streamlit app is a collection of tools to help you experiment 
        with different ideas and concepts about LLMs, AI, machine learning and eveything
        that gets discussed on ['infinite loop'](https://publish.obsidian.md/infinite-loop)
        
        **👈 Select a demo from the sidebar**
       
        ### The blog:
        [infinite-loop](https://publish.obsidian.md/infinite-loop)
    """
    )


if __name__ == "__main__":
    init_vars()
    intro()
    render_sidebar()
