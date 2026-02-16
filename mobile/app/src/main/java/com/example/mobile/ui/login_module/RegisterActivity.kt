package com.example.mobile.ui.login_module

import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.R

class RegisterActivity : AppCompatActivity() {

    private lateinit var etUsername: EditText
    private lateinit var etEmail: EditText
    private lateinit var etPhone: EditText
    private lateinit var etPassword: EditText
    private lateinit var etConfirmPassword: EditText
    private lateinit var btnRegister: Button
    private lateinit var tvLogin: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)


        etUsername = findViewById(R.id.etUsername)
        etEmail = findViewById(R.id.etEmail)
        etPhone = findViewById(R.id.etPhone)
        etPassword = findViewById(R.id.etPassword)
        etConfirmPassword = findViewById(R.id.etConfirmPassword)
        btnRegister = findViewById(R.id.btnRegister)
        tvLogin = findViewById(R.id.tvLogin)

        // Register button click
        btnRegister.setOnClickListener {
            if (validateForm()) {
                // TEMP: Show success message (replace later with API call)
                btnRegister.text = "ACCOUNT CREATED ✓"
                btnRegister.isEnabled = false
            }
        }

        // Go to Login screen
        tvLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun validateForm(): Boolean {

        var isValid = true

        val username = etUsername.text.toString().trim()
        val email = etEmail.text.toString().trim()
        val phone = etPhone.text.toString().replace("\\D".toRegex(), "")
        val password = etPassword.text.toString()
        val confirmPassword = etConfirmPassword.text.toString()

        // Clear previous errors
        etUsername.error = null
        etEmail.error = null
        etPhone.error = null
        etPassword.error = null
        etConfirmPassword.error = null

        // Username validation
        if (username.isEmpty()) {
            etUsername.error = "Username is required"
            isValid = false
        } else if (username.length < 3) {
            etUsername.error = "Username must be at least 3 characters"
            isValid = false
        }

        // Email validation
        if (email.isEmpty()) {
            etEmail.error = "Email is required"
            isValid = false
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            etEmail.error = "Please enter a valid email"
            isValid = false
        }

        // Phone validation
        if (phone.isEmpty()) {
            etPhone.error = "Phone number is required"
            isValid = false
        } else if (phone.length < 10 || phone.length > 15) {
            etPhone.error = "Invalid phone number"
            isValid = false
        }

        // Password validation
        if (password.isEmpty()) {
            etPassword.error = "Password is required"
            isValid = false
        } else if (password.length < 6) {
            etPassword.error = "Password must be at least 6 characters"
            isValid = false
        }

        // Confirm password
        if (confirmPassword.isEmpty()) {
            etConfirmPassword.error = "Please confirm password"
            isValid = false
        } else if (password != confirmPassword) {
            etConfirmPassword.error = "Passwords do not match"
            isValid = false
        }

        return isValid
    }
}
