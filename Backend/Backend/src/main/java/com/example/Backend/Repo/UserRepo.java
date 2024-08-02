package com.example.Backend.Repo;

import com.example.Backend.Entity.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepo extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUsername(String username);
}
