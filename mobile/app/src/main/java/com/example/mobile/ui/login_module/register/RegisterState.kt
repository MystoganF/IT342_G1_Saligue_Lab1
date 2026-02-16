
package com.example.mobile.ui.login_module.register

sealed class RegisterState {

    object Loading : RegisterState()

    data class Success(val message: String) : RegisterState()

    data class Error(val message: String) : RegisterState()
}

