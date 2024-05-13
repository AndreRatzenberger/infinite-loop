import streamlit as st
from toolbox.mytools.mongo_db_settings import MongoDBSettings
from toolbox.modules.mongo_db_settings_ui import MongoDBSettingsUI


def init():
    st.title("Document Storage Manager")

    tab1, tab2 = st.tabs(["MongoDB", "Azure Blob Storage"])

    with tab1:
        settings = MongoDBSettings(name="MONGO_DB")
        render(settings)

    with tab2:
        st.write("Azure Blob Storage")


def render(settings):
    ui = MongoDBSettingsUI(settings)
    ui.render()


init()
