<template>
  <el-dialog v-model="dialogFormVisible" :title="title" class="w-80 sm:w-96 md:w-[32rem]">
    <!-- login -->
    <el-form v-if="!showRegister" :model="loginForm" :rules="rules" ref="loginRef" :status-icon="true">
      <el-form-item label="邮箱" id="login-email" prop="email">
        <el-input v-model="loginForm.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入6-20位密码" />
      </el-form-item>
      <div class="dialog-footer ">
        <div class="flex justify-around">
          <el-button type="danger" @click="showRegister = !showRegister" class="w-[10rem]">{{ buttonText }}</el-button>
          <el-button type="danger" :disabled="isLoginButtonDisabled" @click="login" class="w-[10rem]">
            登录
          </el-button>
        </div>
      </div>
    </el-form>
    <!-- register -->
    <el-form v-if="showRegister" :model="registerForm" :rules="rules" ref="registerRef" :status-icon="true">
      <el-form-item>
        <input class="hidden" type="file" @change="previewAndJudge" accept=".jpg,.jpeg,.png" id="file" />
        <div class="flex flex-col justify-center items-center m-auto">
          <label for="file">
            <div
              class="relative flex flex-col justify-center items-center w-40 h-40 border border-dashed border-gray-400 hover:border-red-500 rounded-md">
              <upload-filled ref="uploadSVG" class="w-2/3 *:fill-gray-400" />
              <span ref="uploadTip">点击上传图片</span>
              <img class="hidden absolute w-full h-full rounded-md" ref="avatarPreview" src="" alt="">
            </div>
          </label>
          <span>图片要求：1M以内，jpg、jpeg、png格式</span>
          <span :class="{ 'hidden': !isTooLarge }" class="text-red-500">图片过大</span>
        </div>
      </el-form-item>
      <el-form-item label="昵称" id="login-email" prop="name">
        <el-input v-model="registerForm.name" placeholder="例：哈基米" />
      </el-form-item>
      <el-form-item label="邮箱" id="login-email" prop="email">
        <el-input v-model="registerForm.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password" prop="password">
        <el-input v-model="registerForm.password" placeholder="请输入6-20位密码" />
      </el-form-item>
      <el-form-item label="验证码" id="login-code" prop="code">
        <div class="w-full flex gap-3">
          <el-input v-model="registerForm.code" placeholder="请输入4位验证码" />
          <el-button type="danger" :disabled="isGetCodeButtonDisabled" @click="getCode" class="">获取验证码<span
              :class="{ 'hidden': isCountdownHidden }">({{ countdown }})</span></el-button>
        </div>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <div class="dialog-footer ">
        <div class="flex justify-around">
          <el-button type="danger" @click="showRegister = !showRegister" class="w-[10rem]">{{ buttonText }}</el-button>
          <el-button type="danger" :disabled="isRegisterButtonDisabled" @click="register" class="w-[10rem]">
            注册
          </el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue'
import { reqLogin, reqRegister, reqCode } from '@/api/login';
import { useUserStore } from '@/store/user';
import { emitter } from '@/utils/emitter';
import { ElMessage } from 'element-plus';

const [dialogFormVisible] = defineModel<boolean>({ required: true })

onUnmounted(() => {
  //在点击登录/注册按钮时，由于register界面未显示，avatarPreview没有实例，因此没有值。
  //如果这时关闭组件，组件就会卸载，获取avatarPreview.value就会报错，所以必须加上`?`。
  if (avatarPreview.value?.src) {
    //每次调用 createObjectURL() 时，都会创建一个新的对象 URL，即使已经为同一个对象创建了一个 URL。
    //当不再需要这些对象时，必须通过调用 URL.revokeObjectURL() 来释放它们。
    // 浏览器会在卸载文档时自动释放对象 URL；然而，为了优化性能和内存使用，如果在安全时间内可以明确卸载，就应该卸载。
    URL.revokeObjectURL(avatarPreview.value.src)
  }
})

const userStore = useUserStore()
const loginRef = ref()
const registerRef = ref()

const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  code: ''
})
const rules = ref({
  name: [
    { required: true, message: "昵称不能为空", trigger: 'blur' }
  ],
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: 'blur' },
    { type: 'email', message: "请输入有效的邮箱地址", trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: 'change' },
    { min: 6, max: 20, message: "密码为6～20位", trigger: 'change' }
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: 'blur' },
    { min: 4, max: 4, message: "验证码为4位数字", trigger: 'blur' }
  ]
})
const showRegister = ref(false)
const title = computed(() => {
  if (showRegister.value) {
    return '注册'
  } else {
    return '登录'
  }
})
const buttonText = computed(() => {
  if (showRegister.value) {
    return '去登录'
  } else {
    return '去注册'
  }
})
const isRegisterButtonDisabled = ref(true)
const isLoginButtonDisabled = ref(true)
const isGetCodeButtonDisabled = ref(true)
const isTooLarge = ref(false)
const isFileChoosed = ref(false)
const avatarPreview = ref()
const uploadSVG = ref()
const uploadTip = ref()
//倒计时
const countdown = ref(60)
const isCountdownHidden = ref(true)

async function login() {
  try {
    const { data: { token, avatarPath, name, id } } = await reqLogin(loginForm.value)
    userStore.$patch({
      isLogin:true,
      token,
      avatarPath,
      name,
      email:loginForm.value.email
    })
    userStore.isLogin=true
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: "登录成功"
    })
  } catch { }
}

//实现avatar上传是否符合规范的判断和预览
function previewAndJudge() {
  isFileChoosed.value = true
  const file = document.getElementById('file') as HTMLInputElement
  if (file.files![0]) {
    avatarPreview.value.src = URL.createObjectURL(file.files![0])
    avatarPreview.value.classList.remove('hidden')
    uploadSVG.value.$el.classList.add('hidden')
    uploadTip.value.classList.add('hidden')
    if (file.files![0].size > 1024 * 1024) {
      isTooLarge.value = true
    } else {
      isTooLarge.value = false
    }
  }
}

function getCode() {
  //不用等待结果返回，直接开始倒计时
  reqCode(registerForm.value.email)
  isCountdownHidden.value = false
  isGetCodeButtonDisabled.value = true
  let timer = setInterval(() => {
    if (countdown.value > 0) countdown.value -= 1
    else {
      isCountdownHidden.value = true
      isGetCodeButtonDisabled.value = false
      clearInterval(timer)
      countdown.value = 60
    }
  }, 1000)
}

async function register() {
  const file = (document.getElementById('file') as HTMLInputElement).files![0]
  const formData = new FormData()
  formData.append('avatar', file)
  formData.append('name', registerForm.value.name)
  formData.append('email', registerForm.value.email)
  formData.append('password', registerForm.value.password)
  formData.append('code', registerForm.value.code)
  //我们甚至不用设置content-type，因为axios会自动帮我们设置好
  try {
    const { data: { token, avatarPath, id } } = await reqRegister(formData)
    userStore.$patch({
      isLogin: true,
      token: token,
      avatarPath: avatarPath,
      name: registerForm.value.name,
      email: registerForm.value.email
    })
    userStore.isLogin=true
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message:"注册成功"
    })
  } catch { }
}

//监听登录表单是否合规，合规则启动登录申请按钮
watch(loginForm, () => {
  loginRef.value.validate((valid: any) => {
    if (!valid) {
      isLoginButtonDisabled.value = true
    }
    else {
      isLoginButtonDisabled.value = false
    }
  })
}, { deep: true })

//判断email是否合规，合规则可以发送验证码
watch(() => registerForm.value.email, () => {
  registerRef.value.validateField('email', (valid: any) => {
    if (!valid) {
      isGetCodeButtonDisabled.value = true
    }
    else isGetCodeButtonDisabled.value = false
  })
})

//判断整个注册表单以及头像文件是否合规，合规则可以申请注册。
watch([registerForm, isTooLarge, isFileChoosed], () => {
  registerRef.value.validate((valid: any) => {
    if (!valid || isTooLarge.value || !isFileChoosed.value) {
      isRegisterButtonDisabled.value = true
    }
    else {
      isRegisterButtonDisabled.value = false
    }
  })
}, { deep: true })
</script>

<style lang="scss" scoped></style>