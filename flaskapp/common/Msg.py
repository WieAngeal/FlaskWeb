



class ResponseCode(object):
    REGISTER_SUCCESS = 100  # 成功
    REGISTER_FAIL = 101  # 失败
    REGISTER_USER_IS_EXIST = 102,  # 你注册的用户已存在

    LOGIN_SUCCESS = 200,  # 登录成功
    LOGIN_USER_PSWD_ERROR = 201,  # 用户名或密码错误
    LOGIN_TELPHONE_IS_NOT_EXIST = 202,  # 用户名或密码不能为空
    LOGIN_FAILED = 203,  # 登录失败
    LOGIN_GET_TOKEN_FAILED = 204,  # 获取token失败
    LOGIN_TOKEN_ERROR = 205,  # token错误或过期

class ResponseMessage(object):
    SUCCESS = "成功"
    FAIL =  "失败"
    NO_RESOURCE_FOUND =  "未找到资源"
    INVALID_PARAMETER =  "参数无效"
    ACCOUNT_OR_PASS_WORD_ERR =  "账户或密码错误"


class ResMsg(object):
    """
    封装响应文本
    """

    def __init__(self, data=None, code=ResponseCode.SUCCESS,
    			 msg=ResponseMessage.SUCCESS):
        self._data = data
        self._msg = msg
        self._code = code

    def update(self, code=None, data=None, msg=None):
        """
        更新默认响应文本
        :param code:响应状态码
        :param data: 响应数据
        :param msg: 响应消息
        :return:
        """
        if code is not None:
            self._code = code
        if data is not None:
            self._data = data
        if msg is not None:
            self._msg = msg

    def add_field(self, name=None, value=None):
        """
        在响应文本中加入新的字段，方便使用
        :param name: 变量名
        :param value: 变量值
        :return:
        """
        if name is not None and value is not None:
            self.__dict__[name] = value

    @property
    def data(self):
        """
        输出响应文本内容
        :return:
        """
        body = self.__dict__
        body["data"] = body.pop("_data")
        body["msg"] = body.pop("_msg")
        body["code"] = body.pop("_code")
        return body



STATUS_CODE = {
    100,   #注册成功
    101,   #你注册的用户已存在
    102,   #
    103,   #注册成功
    104,   #注册成功
    105,   #注册成功
    106,   #注册成功

    200,   #登录成功
    201,   #用户名或密码错误
    202,   #用户名或密码不能为空
    203,   #用户不存在
    204,   #注册成功
    205,   #注册成功
    206,   #注册成功

    300,   #注册成功
    301,   #注册成功
    302,   #注册成功
    303    #注册成功
}


STATUS_TEXT = {
    "注册成功!",
    "你注册的用户已存在！",
    "",
    "",
    "",
    "",
    "",

    "登录成功!",
    "用户名或密码错误！",
    "用户名或密码不能为空！",
    "用户不存在！",
    "",
    "",   #注册成功
    "",   #注册成功

    "",   #注册成功
    "",   #注册成功
    "",   #注册成功
    ""    #注册成功
}