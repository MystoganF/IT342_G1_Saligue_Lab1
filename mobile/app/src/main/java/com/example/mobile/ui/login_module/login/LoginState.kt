package com.example.mobile.ui.login_module.login

sealed class LoginState {
    object Idle : LoginState()
    object Loading : LoginState()
    data class Success(val token: String, val username: String) : LoginState()
    data class Error(val message: String) : LoginState()
}
