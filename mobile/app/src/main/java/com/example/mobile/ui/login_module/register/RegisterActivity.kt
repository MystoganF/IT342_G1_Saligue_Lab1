package com.example.mobile.ui.login_module.register

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider

import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.example.mobile.R
import com.example.mobile.ui.login_module.login.LoginActivity


class RegisterActivity : AppCompatActivity() {

    private lateinit var inputUsername: EditText
    private lateinit var inputEmail: EditText
    private lateinit var inputPhone: EditText
    private lateinit var inputPassword: EditText
    private lateinit var inputConfirmPassword: EditText
    private lateinit var buttonRegister: Button
    private lateinit var textLoginRedirect: TextView

    private lateinit var viewModel: RegisterViewModel


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        viewModel = ViewModelProvider(this)[RegisterViewModel::class.java]

        // Bind Views
        inputUsername = findViewById(R.id.inputUsername)
        inputEmail = findViewById(R.id.inputEmail)
        inputPhone = findViewById(R.id.inputPhone)
        inputPassword = findViewById(R.id.inputPassword)
        inputConfirmPassword = findViewById(R.id.inputConfirmPassword)
        buttonRegister = findViewById(R.id.buttonRegister)
        textLoginRedirect = findViewById(R.id.textLoginRedirect)

        observeViewModel()

        buttonRegister.setOnClickListener {
            if (validateForm()) {

                buttonRegister.isEnabled = false
                buttonRegister.text = "Creating account..."

                viewModel.register(
                    username = inputUsername.text.toString().trim(),
                    email = inputEmail.text.toString().trim(),
                    phone = inputPhone.text.toString().trim(),
                    password = inputPassword.text.toString()
                )
            }
        }

        textLoginRedirect.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun observeViewModel() {
        viewModel.registerState.observe(this, Observer { state ->

            when (state) {

                is RegisterState.Loading -> {
                    buttonRegister.isEnabled = false
                    buttonRegister.text = "Creating account..."
                }

                is RegisterState.Success -> {
                    buttonRegister.text = "Account Created ✓"
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()

                    // Redirect to login after short delay
                    buttonRegister.postDelayed({
                        startActivity(Intent(this, LoginActivity::class.java))
                        finish()
                    }, 1200)
                }

                is RegisterState.Error -> {
                    buttonRegister.isEnabled = true
                    buttonRegister.text = "REGISTER"
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
            }
        })
    }

    private fun validateForm(): Boolean {
        var isValid = true

        val username = inputUsername.text.toString().trim()
        val email = inputEmail.text.toString().trim()
        val phone = inputPhone.text.toString().replace("\\D".toRegex(), "")
        val password = inputPassword.text.toString()
        val confirmPassword = inputConfirmPassword.text.toString()

        inputUsername.error = null
        inputEmail.error = null
        inputPhone.error = null
        inputPassword.error = null
        inputConfirmPassword.error = null

        if (username.length < 3) {
            inputUsername.error = "Username must be at least 3 characters"
            isValid = false
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            inputEmail.error = "Enter a valid email"
            isValid = false
        }

        if (phone.length !in 10..15) {
            inputPhone.error = "Invalid phone number"
            isValid = false
        }

        if (password.length < 6) {
            inputPassword.error = "Password must be at least 6 characters"
            isValid = false
        }

        if (password != confirmPassword) {
            inputConfirmPassword.error = "Passwords do not match"
            isValid = false
        }

        return isValid
    }
}

