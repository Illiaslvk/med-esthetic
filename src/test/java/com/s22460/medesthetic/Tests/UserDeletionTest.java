package com.s22460.medesthetic.Tests;

import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class UserDeletionTest {

    // Mock the UserRepository to simulate database interactions
    @Mock
    private UserRepository userRepository;

    // Inject the mocked UserRepository into the UserServiceImpl
    @InjectMocks
    private UserServiceImpl userService;

    // Initialize mocks before each test
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDeleteInactiveUsers() {
        LocalDateTime now = LocalDateTime.now();

        User activeUser = new User();
        activeUser.setId(1L);
        activeUser.setLastLoginTime(now.minusMonths(5));

        User inactiveUser = new User();
        inactiveUser.setId(2L);
        inactiveUser.setLastLoginTime(now.minusMonths(7));

        // Return the inactive user
        when(userRepository.findByLastLoginTimeBefore(any(LocalDateTime.class)))
                .thenReturn(Arrays.asList(inactiveUser));

        userService.deleteInactiveUsers();

        // Capture list of users passed to the deleteAll
        ArgumentCaptor<List<User>> argumentCaptor = ArgumentCaptor.forClass(List.class);
        // Verify: deleteAll called with the inactive users
        verify(userRepository, times(1)).deleteAll(argumentCaptor.capture());
        List<User> deletedUsers = argumentCaptor.getValue();

        // Check: only one user is deleted
        assertEquals(1, deletedUsers.size());
        // Check: deleted user is the inactive user
        assertTrue(deletedUsers.contains(inactiveUser));
    }

}