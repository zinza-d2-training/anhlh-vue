<template>
  <div id="container " class="d-flex flex-row">
    <div class="container__left css-register">
      <img src="@/assets/image1.png" alt="" />
    </div>
    <div class="container__right css-register">
      <div class="container css-register d-flex align-start flex-column">
        <div class="container__header css-register">
          <p class="container__header-text css-register">Đăng ký tài khoản</p>
        </div>
        <div class="container__gird">
          <ValidationObserver ref="form" v-slot="{ invalid }" @submit.prevent="onSubmit()">
            <form>
              <ValidationProvider
                name="identityCardNumber"
                rules="required|numeric|requiredCmnd"
                v-slot="{ errors }"
                vid="identity_card_number">
                <v-col cols="12" class="form__email css-form">
                  <label for="password" class="subtitle-1 font-weight-regular"
                    >Số CMND/CCCD <span class="start">(*)</span></label
                  >
                  <v-text-field
                    name="identityCardNumber"
                    class="input input-cmnd"
                    type="text"
                    v-model="identityCardNumber"
                    outlined
                    :error-messages="errors"
                    placeholder="Số CMND/CCCD"
                    hide-details="false"
                    hint="false"></v-text-field>
                  <span class="messageError">{{ errors[0] }}</span>
                </v-col>
              </ValidationProvider>
              <ValidationProvider
                name="email"
                rules="requiredEmail|email"
                v-slot="{ errors }"
                vid="email">
                <v-col cols="12" class="form__email css-form">
                  <label for="password" class="subtitle-1 font-weight-regular"
                    >Email <span class="start">(*)</span></label
                  >
                  <v-text-field
                    name="email"
                    class="input input-cmnd"
                    type="email"
                    outlined
                    :error-messages="errors"
                    v-model="email"
                    placeholder="Email"
                    hide-details="false"
                    hint="false"></v-text-field>
                  <span class="messageError">{{ errors[0] }}</span>
                </v-col>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="requiredPw|alphaSpaces|min:8"
                v-slot="{ errors }">
                <v-col cols="12" class="form__email css-form">
                  <label for="password" class="subtitle-1 font-weight-regular"
                    >Mật khẩu <span class="start">(*)</span></label
                  >
                  <v-text-field
                    name="password"
                    class="input input-cmnd"
                    type="password"
                    outlined
                    :error-messages="errors"
                    v-model="password"
                    placeholder="********"
                    hide-details="false"
                    hint="false"></v-text-field>
                  <span class="messageError">{{ errors[0] }}</span>
                </v-col>
              </ValidationProvider>
              <ValidationProvider name="fullName" rules="required" v-slot="{ errors }">
                <v-col cols="12" class="form__email css-form">
                  <label for="password" class="subtitle-1 font-weight-regular"
                    >Họ và tên <span class="start">(*)</span></label
                  >
                  <v-text-field
                    name="fullName"
                    class="input input-cmnd"
                    type="text"
                    outlined
                    :error-messages="errors"
                    v-model="fullName"
                    placeholder="Họ và tên"
                    hide-details="false"
                    hint="false"></v-text-field>
                  <span class="messageError">{{ errors[0] }}</span>
                </v-col>
              </ValidationProvider>
              <ValidationProvider name="birthday" :rules="'required'" v-slot="{ errors }" slim>
                <v-col cols="12" class="form__email css-form">
                  <label for="birthday" class="subtitle-1 font-weight-regular"
                    >Ngày sinh <span class="start">(*)</span></label
                  >
                  <v-menu
                    name="birthday"
                    ref="menu"
                    :rules="[(v) => !!v || 'Required']"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="birthday"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        name="birthday"
                        v-model="birthday"
                        label="ngày/tháng/năm"
                        append-icon="mdi-calendar"
                        outlined
                        v-on="on"
                        readonly
                        :rules="[(v) => !!v || 'đây là trường bắt buộc']"
                        :error-messages="errors[0]"></v-text-field>
                    </template>
                    <v-date-picker v-model="birthday" data-vv-as="birthday" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(birthday)"> OK </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </ValidationProvider>
              <ValidationProvider name="gender" rules="required" v-slot="{ errors }">
                <v-col cols="12" class="form__email css-form">
                  <label for="gender" class="subtitle-1 font-weight-regular"
                    >Giới tính <span class="start">(*)</span></label
                  >
                  <v-radio-group
                    row
                    v-model="gender"
                    name="gender"
                    v-for="(_gender, index) in genders"
                    :key="index">
                    <v-radio :label="getLabelGender(_gender)" :value="_gender"></v-radio>
                  </v-radio-group>
                  <span class="messageError">{{ errors[0] }}</span>
                </v-col>
              </ValidationProvider>
              <ValidationProvider name="province" rules="required" v-slot="{ errors }">
                <div class="mt">
                  <label for="province" class="subtitle-1 font-weight-regular"
                    >Tỉnh/Thành phố <span class="start">(*)</span></label
                  >
                  <v-col class="d-flex" cols="12" sm="6" name="province">
                    <v-select
                      :items="provinces"
                      label="Tỉnh/Thành phố"
                      outlined
                      hide-details="auto"
                      data-name="province"
                      v-model="selectedProvince"
                      :error-messages="errors"
                      return-object
                      item-text="name"
                      item-value="id">
                    </v-select>
                  </v-col>
                </div>
              </ValidationProvider>
              <ValidationProvider name="district" rules="required" v-slot="{ errors }">
                <div class="mt">
                  <label for="district" class="subtitle-1 font-weight-regular"
                    >Quận/Huyện <span class="start">(*)</span></label
                  >
                  <v-col class="d-flex" cols="12" sm="6" name="district">
                    <v-select
                      :items="districts"
                      label="Quận/Huyện"
                      outlined
                      data-name="district"
                      v-model="selectedDistrict"
                      :error-messages="errors"
                      return-object
                      item-text="name"
                      item-value="id"></v-select>
                  </v-col>
                </div>
              </ValidationProvider>
              <ValidationProvider name="ward" rules="required" v-slot="{ errors }">
                <div class="mt">
                  <label for="ward" class="subtitle-1 font-weight-regular"
                    >Xã/Phường <span class="start">(*)</span></label
                  >
                  <v-col class="d-flex" cols="12" sm="6" name="ward">
                    <v-select
                      :items="wards"
                      label="Xã/Phường"
                      outlined
                      data-name="ward"
                      v-model="selectedWard"
                      return-object
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"></v-select>
                  </v-col>
                </div>
              </ValidationProvider>
              <div class="container__dialogactions css-register">
                <v-btn :disabled="invalid" type="submit">
                  TIẾP TỤC
                  <i class="bx bx-right-arrow-alt"></i>
                </v-btn>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { instance } from '../api/axios';
import { required, min, email, numeric } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import { Gender, labelFromGender } from '../../components/type';
import { District, Ward, Province } from './type';
import { userApi } from '../api/users';
import { UserRegister } from '../api/type';

extend('numeric', {
  ...numeric,
  message: 'bắt buộc phải là số'
});
extend('requiredEmail', {
  ...required,
  message: 'Bắt buộc phải nhập email!'
});
extend('required', {
  ...required,
  message: 'bắt buộc phải nhập'
});
extend('requiredPw', {
  ...required,
  message: 'Bắt buộc password!'
});
extend('email', {
  ...email,
  message: 'bắt buộc phải là email'
});
extend('min', {
  ...min,
  message: 'bắt buộc 8 kí tự'
});
extend('alphaSpaces', {
  message: (field) => `${field}` + ' ' + 'không được nhập dấu cách',
  validate: (value) => {
    for (let i = 0; i < value.length - 1; i++) {
      let input = value.charAt(i);
      if (input == ' ') {
        return false;
      }
    }
    return true;
  }
});
extend('requiredCmnd', {
  message: (field) => `${field}` + ' ' + 'phải 9 hoặc 12 số',
  validate: (value) => {
    if (value.length == 9 || value.length == 12) {
      return true;
    }
    return false;
  }
});

@Component({})
export default class UserComponent extends Vue {
  $router: any;
  menu: boolean = false;
  identityCardNumber: number | null = null;
  email: string = '';
  password: string = '';
  fullName: string = '';
  birthday: Date | null = null;
  genders: Gender[] = [Gender.MALE, Gender.FEMALE];
  gender: Gender = Gender.MALE;
  selectedWard: Ward | null = null;
  selectedProvince: Province | null = null;
  selectedDistrict: District | null = null;
  provinces: Province[] = [];
  districtsFromDB: District[] = [];
  wardsFromDB: Ward[] = [];

  async getUnitAdministrative() {
    try {
      const response = await instance.get<Province[]>(`/data-administrative-unit/`);
      this.provinces = response.data;
    } catch (error) {
      return 'error server 500';
    }
  }

  async created() {
    await this.getUnitAdministrative();
  }

  getLabelGender(gender: Gender) {
    return labelFromGender(gender);
  }
  get districts() {
    return this.selectedProvince?.districts ?? [];
  }
  get wards(): Ward[] {
    return this.selectedDistrict?.wards ?? [];
  }
  @Watch('selectedProvince')
  onchangeSelectedProvince() {
    this.selectedDistrict = null;
    this.selectedWard = null;
  }

  @Watch('selectedDistrict')
  async onchangeSelectDistrict() {
    this.selectedWard = null;
  }

  async onSubmit() {
    try {
      const user: UserRegister = {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        gender: this.gender,
        birthday: this.birthday,
        ward_id: this.selectedWard?.id,
        role: 'user',
        identity_card_number: this.identityCardNumber
      };
      const response = await userApi.postUserRegister(
        `${process.env.VUE_APP_URL}/auth/register`,
        user
      );
      if (response.data?.status === 200) {
        this.$router.push('/user');
      }
    } catch (error: any) {
      const statusCode = error.response.status;

      if (statusCode === 422) {
        const errorsBag = error.response.data;

        // @ts-ignore
        this.$refs.form.setErrors(errorsBag);
      }
    }
  }
}
</script>
<style>
.container__left.css-register {
  position: fixed;
  width: 50%;
}
.container__right.css-register {
  width: 100%;
  margin-left: 50%;
  z-index: 1;
}
.container.css-register {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}
.container.css-register .container__header.css-register {
  width: 400px;
  height: 42px;
}
.container.css-register .container__header-text.css-register {
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  margin-top: 12px;
}
.container__right.css-register .messageError {
  color: red;
  font-size: 12px;
  padding: 0 0 12px;
}
.v-application p {
  margin-bottom: 0px !important;
}
.container.css-register .container__gird {
  width: 400px;
}

.container.css-register .container__gird .col {
  padding: 16px 0 0 0;
  position: relative;
}
.container.css-register .container__gird .bxs-down-arrow {
  position: absolute;
  left: 95%;
  top: 7%;
  font-size: 10px;
  color: #000000;
}
.container.css-register .container__gird .v-input {
  padding-top: 5px;
}
.container.css-register .container__gird .start {
  color: red;
}

.v-input--radio-group__input {
  border: none;
  cursor: default;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.v-input--selection-controls {
  margin-top: 0 !important;
}

.container__right .container__dialogactions.css-register {
  width: 400px;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.container__right.css-register .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background: none !important;
}
.container__right.css-register .v-btn__content {
  padding-top: 4px;
  color: #3f51b5 !important;
}
.v-btn:not(.v-btn--round).v-size--default {
  padding: 0 !important;
}

.container a {
  text-decoration: none;
  font-size: 14px;
  font-weight: medium;
}
.container__right .container__dialogactions.css-register .bx-right-arrow-alt {
  color: #3f51b5;
  margin-left: 8px;

  font-size: 15px;
}
.container__right.css-register .mt {
  margin-top: 16px;
}
.col-sm-6 {
  max-width: 100% !important;
  padding: 0px !important;
}
.v-input__slot {
  margin-bottom: 0px !important;
}
.v-text-field__details {
  min-height: 0px !important;
}
.v-messages {
  min-height: 0 !important;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0 !important;
  padding-top: 0;
}
</style>
