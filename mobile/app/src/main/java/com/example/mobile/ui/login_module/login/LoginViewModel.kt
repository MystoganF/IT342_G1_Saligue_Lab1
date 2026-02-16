package com.example.mobile.ui.login_module.login

import androidx.lifecycle.*
import com.example.mobile.data.repository.AuthRepository
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {

    private val repository = AuthRepository()

    private val _loginState = MutableLiveData<LoginState>(LoginState.Idle)
    val loginState: LiveData<LoginState> = _loginState

    fun login(username: String, password: String) {

        viewModelScope.launch {

            _loginState.value = LoginState.Loading

            val result = repository.login(username, password)

            _loginState.value = result.fold(
                onSuccess = { LoginState.Success(it.token) },
                onFailure = { LoginState.Error(it.message ?: "Login failed") }
            )
        }
    }
}
