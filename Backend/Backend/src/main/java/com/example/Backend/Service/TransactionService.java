package com.example.Backend.Service;

import com.example.Backend.Entity.Transaction;
import com.example.Backend.Repo.TransactionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TransactionService {

    @Autowired
    private final TransactionRepo transactionRepo;

    public Mono<Transaction> getTransactionById(String id) {
        return transactionRepo.findById(id);

    }

    public Flux<Transaction> findAll() {
        return transactionRepo.findAll();

    }

    public Mono<Transaction> insert(Transaction transaction) {
        return transactionRepo.save(transaction);
    }

    public Mono<Void> delete(String id) {
        return transactionRepo.deleteById(id);
    }
}
