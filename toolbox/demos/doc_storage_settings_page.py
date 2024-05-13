import streamlit as st
from toolbox.mytools.db_settings import DBSettings
from toolbox.modules.db_settings_ui import DBSettingsUI


def init():
    st.title("Document Storage Manager")

    tab1, tab2, tab3 = st.tabs(["MongoDB", "Azure Blob Storage", "local filesystem"])

    with tab1:
        settings = DBSettings(name="MONGO_DB")
        render(settings)

    with tab2:
        settings = DBSettings(name="AZURE_BLOB", conn_string="azure conn string")
        render(settings)

    with tab3:
        settings = DBSettings(name="LOCAL_FS", conn_string=".", database_name="data")
        render(settings)


def render(settings):
    ui = DBSettingsUI(settings)
    ui.render()


init()
