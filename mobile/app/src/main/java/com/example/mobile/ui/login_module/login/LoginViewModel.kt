package com.example.mobile.ui.login_module.login

import android.app.Application
import androidx.lifecycle.*
import com.example.mobile.data.repository.AuthRepository
import com.example.mobile.utils.SessionManager
import kotlinx.coroutines.launch

class LoginViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = AuthRepository(application.applicationContext)
    private val sessionManager = SessionManager(application.applicationContext)

    private val _loginState = MutableLiveData<LoginState>(LoginState.Idle)
    val loginState: LiveData<LoginState> = _loginState

    fun login(username: String, password: String) {

        viewModelScope.launch {

            _loginState.value = LoginState.Loading

            val result = repository.login(username, password)

            _loginState.value = result.fold(
                onSuccess = {

                    // save session
                    sessionManager.saveSession(it.token, it.username)

                    // send BOTH values to UI
                    LoginState.Success(it.token, it.username)
                },
                onFailure = {
                    LoginState.Error(it.message ?: "Login failed")
                }
            )
        }
    }

}

