package sam.timesheet

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

class CustomUserDetailsService implements UserDetailsService {

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Person person = Person.findByUsernameAndEnabled(username, true)
        if (person == null) {
            throw new UsernameNotFoundException(String.format("User %s does not exist!", username))
        }
        new User(person.username, person.password, [new SimpleGrantedAuthority("ROLE_ADMIN")])
    }

}
