<template>
  <div class="form-create-user">
    <div class="container">
      <h2>Account details</h2>
      <div class="photo">
        <img src="../assets/img/DSC00577.JPG" alt="avata" width="100" />
        <div class="photo_content-img">
          <button class="add-photo">Upload new Photo</button>
          <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>
      <div class="information">
        <div class="information_content">
          <i class="fa-solid fa-image-portrait"></i>
          <input type="text" placeholder="username" v-model="username" />
        </div>

        <div class="information_content">
          <input type="text" placeholder="fullName" v-model="fullName" />
        </div>

        <div class="information_content">
          <input type="password" placeholder="password" v-model="password" />
        </div>
        <div class="information_content">
          <input type="password" placeholder="confirmPassword" v-model="confirmPassword" />
        </div>

        <div class="information_content">
          <div class="information_content_selects">
            <label for="select1">Male</label>
            <input type="radio" name="information_content_gender" value="Male" />
          </div>
          <div class="information_content_selects">
            <label for="select2">Female</label>
            <input type="radio" name="information_content_gender" value="Female" />
          </div>
        </div>
      </div>
      <button class="save" @click="register">REGISTER</button>
      <button type="reset" class="reset"  @click="backLogin">Login</button>
    </div>
    <button type="submit" class="sign-in" @click="printConsole">Sign in</button>
    <router-view></router-view>
  </div>
</template>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  box-sizing: border-box;
}

.form-create-user {
  background-color: rgba(128, 128, 128, 0.178);
  width: 100%;
  color: black;
}

.container {
  margin: 15px 25px;
  padding: 20px 15px;
  background-color: white;
  border-radius: 8px;
}

.container h2 {
  font-size: 16px;
}

.photo {
  margin: 15px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15px;
}

.photo img {
  border-radius: 12px;
}

.photo .photo_content-img {
  font-size: 12px;
}

.photo .photo_content-img .add-photo {
  border-radius: 5px;
  background-color: rgba(18, 205, 121, 0.884);
  color: white;
  font-size: 12px;
  padding: 8px 10px;
  margin-bottom: 20px;
}

.information {
  padding: 10px;
}

.information_content {
  margin: 10px;
  border: 1px solid rgba(128, 128, 128, 0.178);
  border-radius: 4px;
  padding: 5px 20px;
}

.information_content input {
  border: 0px solid white;
  padding: 5px;
}

.information_content_selects {
  display: flex;
  justify-content: space-between;
  margin: 8px 15px;
}

.save {
  border-radius: 5px;
  background-color: rgba(18, 205, 121, 0.884);
  color: white;
  font-size: 12px;
  padding: 8px 10px;
  font-weight: 700;
}

.reset {
  margin-left: 20px;
  border-radius: 5px;
  background-color: rgba(162, 162, 162, 0.58);
  color: white;
  font-size: 12px;
  padding: 8px 10px;
  font-weight: 700;
}
</style>

<script>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router/index'
//   import { useNotification } from '@kyvg/vue3-notification'
//   import { userAuthStore } from '../../store'

export default {
  setup() {

    const username = ref('')
    const fullName = ref('')
    const password = ref('')
    const confirmPassword = ref()

    const validateName = () => {
      if (fullName.value.trim() === "") {
        return false;
      }
      for (const c of fullName.value) {
        if (c < "A" || (c > "Z" && c < "a") || c > "z") {
          return false;
        }
      }
      return true;
    }

    const validate = () => {
      if (username.value.trim() === '') {
        return 'username'
      }
      if (fullName.value.trim() === '') {
        return 'fullName'
      }
      if (password.value !== confirmPassword.value) {
        return 'password'
      }
      return 'true'
    }
    
    const register = () => {
      if (validateName() === true || validate() !== 'true') {
        return
      }
      axios
        .post('http://localhost:3000/auth/register', {
          username: username.value,
          password: password.value,
          fullName: fullName.value,
        })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error('Register failed')
          }
          router.push('/confirm')
          return response.data
        })
        .catch((error) => {
          console.log("🚀 ~ register ~ error:", error)
          router.push('/sorry')
        })
    }
    const printlog = () => {
      console.log("username.value");
    }
    const backLogin = () => {
      router.push('/login')
    }

    return {
      username,
      fullName,
      password,
      confirmPassword,
      printlog,
      register,
      backLogin
    }
  }
}
</script>