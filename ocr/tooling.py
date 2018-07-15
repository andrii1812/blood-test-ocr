import pyocr


def get_available_tool():
    tools = pyocr.get_available_tools()
    assert len(tools) > 0
    tool = tools[0]
    return tool
