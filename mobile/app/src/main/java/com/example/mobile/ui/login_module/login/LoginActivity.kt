package com.example.mobile.ui.login_module.login

import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.example.mobile.R
import com.example.mobile.ui.login_module.register.RegisterActivity
import com.example.mobile.ui.landing_module.landing.LandingActivity


class LoginActivity : AppCompatActivity() {

    private val viewModel: LoginViewModel by viewModels()

    private lateinit var username: EditText
    private lateinit var password: EditText
    private lateinit var loginBtn: Button
    private lateinit var signUp: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        username = findViewById(R.id.usernameInput)
        password = findViewById(R.id.passwordInput)
        loginBtn = findViewById(R.id.loginButton)
        signUp = findViewById(R.id.signUpText)

        observe()

        loginBtn.setOnClickListener {
            viewModel.login(
                username.text.toString(),
                password.text.toString()
            )
        }

        signUp.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
            finish()
        }
    }

    private fun observe() {

        viewModel.loginState.observe(this, Observer { state ->

            when(state) {

                is LoginState.Loading -> {
                    loginBtn.isEnabled = false
                    loginBtn.text = "Logging in..."
                }

                is LoginState.Success -> {
                    Toast.makeText(this, "Login Success", Toast.LENGTH_SHORT).show()

                    val intent = Intent(this, LandingActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                }

                is LoginState.Error -> {
                    loginBtn.isEnabled = true
                    loginBtn.text = "LOGIN"
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }

                else -> {}
            }
        })
    }
}
