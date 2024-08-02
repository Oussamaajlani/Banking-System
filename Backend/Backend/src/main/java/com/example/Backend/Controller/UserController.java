package com.example.Backend.Controller;

import com.example.Backend.Entity.User;
import com.example.Backend.Entity.Transaction;
import com.example.Backend.Request.SignInRequest;
import com.example.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/User/{id}")
    public Mono<User> getUserById(@PathVariable String id) {
        return userService.getUserFromDbByID(id);
    }

    @GetMapping("/findAll")
    public Flux<User> findAll() {
        return userService.findAll();
    }

    @PostMapping("/signin")
    public Mono<User> signIn(@RequestBody SignInRequest signInRequest) {
        return userService.authenticate(signInRequest.getUsername(), signInRequest.getPassword());
    }
    @PutMapping("/User/{id}")
    public Mono<User> update(@PathVariable String id, @RequestBody User user) {
        return userService.update(id, user);
    }
    @PostMapping("/insert")
    public Mono<User> insert(@RequestBody User user) {
        return userService.insert(user);
    }

    @DeleteMapping("/delete/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return userService.delete(id);
    }

    @PostMapping("/User/{id}/transactions")
    public Mono<User> addTransaction(@PathVariable String id, @RequestBody Transaction transaction) {
        return userService.addTransaction(id, transaction);
    }

    @DeleteMapping("/User/{userId}/transactions/{transactionId}")
    public Mono<User> deleteTransaction(@PathVariable String userId, @PathVariable String transactionId) {
        return userService.deleteTransaction(userId, transactionId);
    }

    @GetMapping("/User/{id}/balance")
    public Mono<Double> getBalance(@PathVariable String id) {
        return userService.getUserFromDbByID(id)
                .map(User::getBalance);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/User/{id}/transactions")
    public Flux<Transaction> getTransactionsByUserId(@PathVariable String id) {
        return userService.getTransactionsByUserId(id);
    }
}
