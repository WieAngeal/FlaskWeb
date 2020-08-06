


class RespCode(object):
    SUCCESS                     = 100  #成功
    FAILED                      = 101  #失败

    LOGIN_SUCCESS               = 200  # 登录成功
    LOGIN_USER_PSWD_ERROR       = 201  # 用户名或密码错误
    LOGIN_TELPHONE_IS_NOT_EXIST = 202  # 用户名或密码不能为空
    LOGIN_FAILED                = 203  # 登录失败
    LOGIN_GET_TOKEN_FAILED      = 204  # 获取token失败
    LOGIN_TOKEN_ERROR           = 205  # token错误或过期

    REGISTER_SUCCESS            = 300  # 注册成功
    REGISTER_FAIL               = 301  # 注册失败
    REGISTER_USER_IS_EXIST      = 302  # 你注册的用户已存在


class RespMsg(object):
    SUCCESS                     = "成功"
    FAILED                      = "失败"

    LOGIN_SUCCESS               = "登录成功"
    LOGIN_USER_PSWD_ERROR       = "用户名或密码错误"
    LOGIN_TELPHONE_IS_NOT_EXIST = "手机号不存在"
    LOGIN_FAILED                = "登录失败"
    LOGIN_GET_TOKEN_FAILED      = "获取token失败"
    LOGIN_TOKEN_ERROR           = "token错误或过期"

    REGISTER_SUCCESS            = "注册成功"
    REGISTER_FAIL               = "注册失败"
    REGISTER_USER_IS_EXIST      = "你注册的用户已存在"

