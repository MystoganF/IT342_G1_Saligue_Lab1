package com.example.mobile.ui.login_module.login

import android.content.Intent
import android.os.Bundle
import android.os.CountDownTimer
import android.widget.*
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.example.mobile.R
import com.example.mobile.ui.login_module.register.RegisterActivity
import com.example.mobile.ui.landing_tenant_module.landing.LandingActivity
import com.example.mobile.utils.SessionManager

class LoginActivity : AppCompatActivity() {

    private val viewModel: LoginViewModel by viewModels()

    private var loginAttempts = 0
    private val MAX_ATTEMPTS = 5
    private val LOCK_TIME = 20000L // 20 seconds

    private var countDownTimer: CountDownTimer? = null

    private lateinit var username: EditText
    private lateinit var password: EditText
    private lateinit var loginBtn: Button
    private lateinit var signUp: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        println("LOGIN ACTIVITY CREATED")

        val session = SessionManager(this)
        if (session.isLoggedIn()) {
            startActivity(Intent(this, LandingActivity::class.java))
            finish()
            return
        }

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

            when (state) {

                is LoginState.Loading -> {
                    loginBtn.isEnabled = false
                    loginBtn.text = "Logging in..."
                }

                is LoginState.Success -> {

                    loginAttempts = 0
                    countDownTimer?.cancel()

                    Toast.makeText(this, "Login Success", Toast.LENGTH_SHORT).show()

                    val session = SessionManager(this)
                    session.saveSession(state.token, state.username)

                    val intent = Intent(this, LandingActivity::class.java)
                    intent.flags =
                        Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                }

                is LoginState.Error -> {

                    loginAttempts++

                    if (loginAttempts >= MAX_ATTEMPTS) {
                        startLockCountdown()
                    } else {
                        loginBtn.isEnabled = true
                        loginBtn.text = "LOGIN"
                        Toast.makeText(
                            this,
                            "Login failed ($loginAttempts/$MAX_ATTEMPTS)",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }

                else -> {}
            }
        })
    }

    private fun startLockCountdown() {

        loginBtn.isEnabled = false

        Toast.makeText(
            this,
            "Too many failed attempts. Try again in 20 seconds.",
            Toast.LENGTH_LONG
        ).show()

        countDownTimer?.cancel()

        countDownTimer = object : CountDownTimer(LOCK_TIME, 1000) {

            override fun onTick(millisUntilFinished: Long) {
                val secondsRemaining = millisUntilFinished / 1000
                loginBtn.text = "Locked (${secondsRemaining}s)"
            }

            override fun onFinish() {
                loginAttempts = 0
                loginBtn.isEnabled = true
                loginBtn.text = "LOGIN"
            }

        }.start()
    }

    override fun onDestroy() {
        super.onDestroy()
        countDownTimer?.cancel()
    }
}