import androidx.lifecycle.*
import kotlinx.coroutines.launch

class RegisterViewModel : ViewModel() {

    private val _result = MutableLiveData<String>()
    val result: LiveData<String> = _result

    fun register(username: String, email: String, phone: String, password: String) {

        viewModelScope.launch {
            try {
                val response = RetrofitInstance.api.register(
                    RegisterRequest(username, email, phone, password)
                )

                if (response.isSuccessful) {
                    _result.value = response.body()?.message ?: "Registered!"
                } else {
                    val error = response.errorBody()?.string()
                    _result.value = error ?: "Registration failed"
                }

            } catch (e: Exception) {
                _result.value = "Cannot connect to server"
            }
        }
    }
}
