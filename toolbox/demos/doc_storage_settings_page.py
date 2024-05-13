import streamlit as st
from toolbox.demos.sidebar import render_sidebar
from toolbox.mytools.db_settings import DBSettings
from toolbox.modules.db_settings_ui import DBSettingsUI
from st_pages import add_page_title


def init():

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


add_page_title()
init()
render_sidebar()
