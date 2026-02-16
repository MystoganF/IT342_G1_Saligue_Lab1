
package com.example.mobile.ui.login_module.register

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mobile.data.repository.AuthRepository
import kotlinx.coroutines.launch

class RegisterViewModel : ViewModel() {

    private val repository = AuthRepository()

    private val _registerState = MutableLiveData<RegisterState>()
    val registerState: LiveData<RegisterState> = _registerState

    fun register(username: String, email: String, phone: String, password: String) {

        _registerState.value = RegisterState.Loading

        viewModelScope.launch {

            val result = repository.register(username, email, phone, password)

            result.onSuccess {
                _registerState.value = RegisterState.Success(it)
            }

            result.onFailure {
                _registerState.value = RegisterState.Error(it.message ?: "Unknown error")
            }
        }
    }
}

