package com.example.mobile.ui.landing_tenant_module.profile

import android.app.Application
import androidx.lifecycle.*
import com.example.mobile.data.repository.UserRepository
import kotlinx.coroutines.launch

class ProfileViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = UserRepository(application.applicationContext)

    /* ---------------- PROFILE STATE ---------------- */

    private val _profile = MutableLiveData<Map<String, String>>()
    val profile: LiveData<Map<String, String>> = _profile

    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading

    private val _message = MutableLiveData<String>()
    val message: LiveData<String> = _message


    /* ---------------- LOAD PROFILE ---------------- */

    fun loadProfile() {
        viewModelScope.launch {

            _loading.value = true

            try {
                val response = repository.getProfile()

                if (response.isSuccessful && response.body() != null) {
                    _profile.value = response.body()
                } else {
                    _message.value = "Failed to load profile (${response.code()})"
                }

            } catch (e: Exception) {
                _message.value = "Network error: ${e.message}"
            }

            _loading.value = false
        }
    }


    /* ---------------- UPDATE PROFILE ---------------- */

    fun updateProfile(username: String, email: String, phone: String) {
        viewModelScope.launch {

            _loading.value = true

            try {
                val response = repository.updateProfile(username, email, phone)

                if (response.isSuccessful) {
                    _message.value = "Profile updated successfully"
                    loadProfile()
                } else {

                    // 🔥 GET REAL BACKEND ERROR
                    val errorText = response.errorBody()?.string()

                    _message.value =
                        if (!errorText.isNullOrBlank())
                            "Update failed (${response.code()}): $errorText"
                        else
                            "Update failed (${response.code()})"
                }

            } catch (e: Exception) {
                _message.value = "Network error: ${e.message}"
            }

            _loading.value = false
        }
    }



    /* ---------------- CHANGE PASSWORD ---------------- */

    fun changePassword(oldPass: String, newPass: String) {
        viewModelScope.launch {

            _loading.value = true

            try {
                val response = repository.changePassword(oldPass, newPass)

                if (response.isSuccessful) {
                    _message.value = "Password changed successfully"
                } else {
                    val errorText = response.errorBody()?.string()

                    _message.value =
                        if (!errorText.isNullOrBlank())
                            "Password change failed (${response.code()}): $errorText"
                        else
                            "Wrong old password or unauthorized"
                }

            } catch (e: Exception) {
                _message.value = "Network error: ${e.message}"
            }

            _loading.value = false
        }
    }

}
