<!-- <script setup>
import { useNotification } from '@kyvg/vue3-notification'
import FormInformationUser from './FormInformationUser.vue'
// const { notify } = useNotification()

// const showNottify = () => {
//   notify({
//     title: 'Submit',
//     text: 'Your information'
//   })
// }
</script> -->



<template>
    <div class="form">
        <div class="form-login">
            <h2>Sign in to your dashboard</h2>
            <div class="input">
                <div class="input_box">
                    <!-- <input type="text" id="username" class="in" placeholder="Username" />
              <input type="text" id="password" class="in" placeholder="Password" /> -->
                    <input type="text" id="username" class="in" placeholder="Username" v-model="username" />
                    <input type="password" id="password" class="in" placeholder="Password" v-model="password" />
                </div>
                <div class="input_expand">
                    <div class="input_expand_remember">
                        <input type="checkbox" id="" />
                        Remember me
                    </div>
                    <div class="input_expand_forgot-password">
                        <a @click="printlog">Forgot your password</a>
                    </div>
                </div>
            </div>
            <button type="submit" class="sign-in" @click="login">Sign in</button>
            <router-view></router-view>

            <!-- <button type="submit" class="sign-in" @click="logout">Logout {{ isLoggedIn }}</button> -->
            <p v-if="isLoggedIn">Login successfully!</p>
            <!-- <button type="submit" class="sign-in" @click="logintest()">Sign in</button> -->
            <div class="new-account">
                Not registered yet ?
                <a href="./register">Create an account</a>
            </div>
        </div>
        <div class="test">
            <!-- <button @click="printlog">hihi</button> -->
            <logout />
            <router-view />

        </div>
    </div>
</template>

<style scoped>
.form {
    display: flex;
    justify-content: center;
    margin: 0px;
    border: 0px;
    padding: 0px;
}

h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 20px;
}

.input_box {
    display: grid;
}

.in {
    height: 40px;
    margin: 10px 0px;
    font-size: 16px;
}

.input_expand {
    display: flex;
    justify-content: space-between;
}

.sign-in {
    display: block;
    width: 100%;
    height: 50px;
    /* font-size: 16px; */
    font-weight: 500;
    margin: 10px 0px;
    border: 0px;
    border-radius: 10px;
    background-color: rgb(74, 52, 240);
    color: white;
    font-size: 18px;
}
</style>


<script>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import router from '../router/index'
//   import { useNotification } from '@kyvg/vue3-notification'
//   import { userAuthStore } from '../../store'

export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const accessToken = ref(localStorage.getItem('accessToken'))
        const isLoggedIn = computed(() => !!accessToken.value)

        const login = () => {
            axios
                .post('http://localhost:3000/auth/login', {
                    username: username.value,
                    password: password.value
                })
                .then((response) => {
                    console.log(response.data.token)
                    console.log(response.data.user)
                    if (response.status !== 200) {
                        throw new Error('Invalid token')
                    }
                    if (response.data.token) {
                        localStorage.setItem('token', JSON.stringify(response.data.token))
                        accessToken.value = localStorage.getItem('accessToken')
                    }

                    router.push('/confirm')
                    return response.data.user
                })
                .catch((error) => {
                    // if (error.response.status === 401) {
                    //   console.log('Invalid token')
                    //   notify({
                    //     type: 'error',
                    //     title: 'No autherntication'
                    //   })
                    //   // console.log(!!localStorage.getItem('accessToken'))
                    // }
                    router.push('/login')
                })
        }
        const logout = () => {
            // localStorage.removeItem('accessToken')

            console.log(!!localStorage.getItem('accessToken'))
            console.log(isLoggedIn.value)
        }

        const printlog = () => {
            console.log("username.value");
        }

        return {
            username,
            password,
            isLoggedIn,
            login,
            logout,
            printlog
        }
    }
}
</script>