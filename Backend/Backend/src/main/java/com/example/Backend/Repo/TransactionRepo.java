package com.example.Backend.Repo;

import com.example.Backend.Entity.Transaction;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TransactionRepo extends ReactiveMongoRepository<Transaction, String> {
}
