# infinite-loop

Content repository for the [infinite-loop](https://publish.obsidian.md/infinite-loop) blog

## How to get started for python illiterates

### Install miniconda

Get [miniconda](https://docs.anaconda.com/free/miniconda/)

Skip if you already know your shit and do whatever you want.

### Install poetry

```bash
pip install poetry
```

### Create a python 3.10.x environment (AFTER installing poetry)

To recreate my environment:

```bash
conda create -n 'your-env-name' python=3.10.12 
```

I'm repeating myself:

- DON'T INSTALL POETRY IN THIS NEWLY CREATED ENVIRONMENT
- INSTALL POETRY IN THE MINICONDA BASE ENVIRONMENT

### Clone this repository and open it in VSCode

clone:

```bash
git clone https://github.com/AndreRatzenberger/infinite-loop
```

### Switch environment

either via VSCode Command palette

![alt text](.img/image.png)

or

```bash
conda activate 'your-env-name' 
```

### Install packages with poetry

In the project root run

```bash
poetry install
```

### Open the app.py in the edior and start the "streamlit debug" task in the debugger

This task is configured to run the currently open document as streamlit application in debug mode

![alt text](.img/image-1.png)

Everything should be running fine now.
If not, github is the wrong place for you anyway. It's ok.
