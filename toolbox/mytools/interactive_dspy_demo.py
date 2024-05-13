from unstructured.partition.html import partition_html
from llama_index.readers.web import UnstructuredURLLoader
import streamlit as st
import os
import re
import dspy
from typing import cast
from typing_extensions import Literal, get_args

from toolbox.mytools.llm_settings import LlmSettings
from toolbox.mytools.user_settings import UserSettings
from toolbox.mytools.utils import split_xy, split


# Crawls the lite cnn website and returns the latest 90-100 news articles
class InteractiveDSPyDemo:
    def __init__(self, llm: str, mode=1):
        self.mode = mode
        self.setLLMModel(UserSettings(name=llm))

    def setLLMModel(self, llm_settings: UserSettings):
        api_key = llm_settings.get_setting("API_KEY")
        base_url = llm_settings.get_setting("BASE_URL")
        model = llm_settings.get_setting("MODEL")
        os.environ["OPENAI_API_KEY"] = api_key
        os.environ["OPENAI_BASE_URL"] = base_url
        llm = dspy.OpenAI(
            model=model,
            api_key=api_key,
            api_base=base_url,
            max_tokens=4000,
        )
        dspy.settings.configure(lm=llm)

    def executeSignature1Code(self, signature: str, inputs: str) -> str:
        predictor = dspy.Predict(signature)

        split_signature = split_xy(signature)[0]
        split_signature_out = split_xy(signature)[1]
        split_inputs = split(inputs)

        kwargs = dict(zip(split_signature, split_inputs))

        result = predictor(**kwargs)
        result_string = "\n\n".join(result._store[i] for i in split_signature_out)

        return result, result_string

    def generateCode(self, signature: str, inputs: str) -> str:
        split_signature = split_xy(signature)[0]
        split_inputs = split(inputs)
        paramstring = ", ".join(
            f"{sig}='{inp}'" for sig, inp in zip(split_signature, split_inputs)
        )
        return f"""
    
        predictor = dspy.Predict({signature})
        result = predictor({paramstring})
        print(result)
        
        """
