import base64
import io
import random
import string
from PIL import Image, ImageFont, ImageDraw

class CaptchaTool(object):
    """
    生成图片验证码
    """

    def __init__(self, width=50, height=12):

        self.width = width
        self.height = height
        # 新图片对象  RGBA,第四通道为透明图片
        self.im = Image.new('RGBA', (width, height), 12)
        # 字体
        self.font = ImageFont.load_default()
        # draw对象
        self.draw = ImageDraw.Draw(self.im)

    def draw_lines(self, num=3):
        """
        划线
        """
        for num in range(num):
            x1 = random.randint(0, self.width / 2)
            y1 = random.randint(0, self.height / 2)
            x2 = random.randint(0, self.width)
            y2 = random.randint(self.height / 2, self.height)
            self.draw.line(((x1, y1), (x2, y2)), fill='white', width=1)

    def get_verify_code(self):
        """
        生成验证码图形
        """
        # 设置随机4位数字验证码
        # code = ''.join(random.sample(string.digits, 4))
        #code = '0123456789'+string.ascii_letters+'9876543210'
        #code = random.sample('0123456789'+string.ascii_letters+'9876543210', 4)
        code = ''
        code_len = 5
        for i in range(code_len):
            add = random.choice([random.randrange(10), chr(random.randrange(65, 91)), chr(random.randrange(97, 122))])
            code += str(add)

        # 绘制字符串
        for item in range(code_len):
            self.draw.text((2 + random.randint(-2, 2) + 10 * item, 2 + random.randint(-2, 2)),
                        text=code[item],
                        fill=(random.randint(160, 200),
                              random.randint(180, 220),
                              random.randint(190, 250))
                        , font=self.font)
        # 划线
        # self.draw_lines()
        # 重新设置图片大小
        self.im = self.im.resize((100, 35))
        # 图片转为base64字符串
        buffered = io.BytesIO()
        self.im.save(buffered, format="PNG")
        img_str = b"data:image/png;base64," + base64.b64encode(buffered.getvalue())
        return img_str, code.lower()