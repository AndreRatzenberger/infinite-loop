import streamlit as st
from st_pages import Page, Section, add_page_title, show_pages


show_pages(
    [
        Page("app.py", "Home", "🏠"),
        Page("toolbox/demos/llm_settings_page.py", "LLM Settings Demo", "🔧"),
        Page(
            "toolbox/demos/doc_storage_settings_page.py",
            "Doc Store Settings Demo",
            "🔧",
        ),
        Page("toolbox/demos/simple_rag_page.py", "Simple RAG Demo", ":book:"),
    ]
)


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
    intro()
