import streamlit as st
from toolbox.demos.llm_settings_page import llm_settings_page


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


def main():
    page_names_to_funcs = {
        "—": intro,
        "LLM Settings": llm_settings_page,
    }

    demo_name = st.sidebar.selectbox("Choose a demo", page_names_to_funcs.keys())
    page_names_to_funcs[demo_name]()


if __name__ == "__main__":
    main()
