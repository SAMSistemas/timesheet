package timesheet

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import sam.timesheet.CustomUserDetailsService

@Configuration
@EnableWebSecurity
public class ProviderSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomUserDetailsService userDetailsService

    @Autowired
    CustomAuthenticationFailureHandler customAuthenticationFailureHandler

    @Autowired
    CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests().antMatchers("/assets/**").permitAll().and()
                .authorizeRequests().anyRequest().authenticated().and()
                .formLogin()
                    .loginPage("/login")
                    .successHandler(customAuthenticationSuccessHandler)
                    .failureHandler(customAuthenticationFailureHandler)
                    .permitAll().and()
                .logout().permitAll().and()
                .httpBasic().and()
                .csrf().disable()
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
    }

}