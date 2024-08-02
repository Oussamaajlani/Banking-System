package com.example.Backend.Service;

import com.example.Backend.Entity.User;
import com.example.Backend.Entity.Transaction;
import com.example.Backend.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    @Autowired
    private final TransactionService transactionService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Mono<User> getUserFromDbByID(String id) {
        log.info("Fetching user by ID: {}", id);
        return userRepo.findById(id);
    }

    public Flux<User> findAll() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }

    public Mono<User> update(String id, User user) {
        log.info("Updating user with ID: {}", id);
        return userRepo.findById(id).flatMap(existingUser -> {
            // Update fields
            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            }
            if (user.getFirstname() != null) {
                existingUser.setFirstname(user.getFirstname());
            }
            if (user.getSecondname() != null) {
                existingUser.setSecondname(user.getSecondname());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            if (user.getFechaDato() != null) {
                existingUser.setFechaDato(user.getFechaDato());
            }
            if (user.getEmpIndex() != null) {
                existingUser.setEmpIndex(user.getEmpIndex());
            }
            if (user.getResidence() != null) {
                existingUser.setResidence(user.getResidence());
            }
            if (user.getSex() != null) {
                existingUser.setSex(user.getSex());
            }
            if (user.getAge() != 0) {
                existingUser.setAge(user.getAge());
            }
            if (user.getFirstDate() != null) {
                existingUser.setFirstDate(user.getFirstDate());
            }
            if (user.getNewCust() != null) {
                existingUser.setNewCust(user.getNewCust());
            }
            if (user.getSeniority() != 0) {
                existingUser.setSeniority(user.getSeniority());
            }
            if (user.getIsPrimary() != 0) {
                existingUser.setIsPrimary(user.getIsPrimary());
            }
            if (user.getLastPrimaryDate() != null) {
                existingUser.setLastPrimaryDate(user.getLastPrimaryDate());
            }
            if (user.getCustType() != null) {
                existingUser.setCustType(user.getCustType());
            }
            if (user.getCustRelType() != null) {
                existingUser.setCustRelType(user.getCustRelType());
            }
            if (user.getResidenceIndex() != null) {
                existingUser.setResidenceIndex(user.getResidenceIndex());
            }
            if (user.getForeignerIndex() != null) {
                existingUser.setForeignerIndex(user.getForeignerIndex());
            }
            if (user.getSpouseIndex() != null) {
                existingUser.setSpouseIndex(user.getSpouseIndex());
            }
            if (user.getChannel() != null) {
                existingUser.setChannel(user.getChannel());
            }
            if (user.getDeceasedIndex() != null) {
                existingUser.setDeceasedIndex(user.getDeceasedIndex());
            }
            if (user.getAddressType() != 0) {
                existingUser.setAddressType(user.getAddressType());
            }
            if (user.getProvinceCode() != 0) {
                existingUser.setProvinceCode(user.getProvinceCode());
            }
            if (user.getProvinceName() != null) {
                existingUser.setProvinceName(user.getProvinceName());
            }
            if (user.getActivityIndex() != null) {
                existingUser.setActivityIndex(user.getActivityIndex());
            }
            if (user.getIncome() != 0) {
                existingUser.setIncome(user.getIncome());
            }
            if (user.getSegment() != null) {
                existingUser.setSegment(user.getSegment());
            }
            if (user.getSavingAccount() == 0) {
                existingUser.setSavingAccount(user.getSavingAccount());
            }
            if (user.getGuarantees() == 0) {
                existingUser.setGuarantees(user.getGuarantees());
            }
            if (user.getCurrentAccounts() == 0) {
                existingUser.setCurrentAccounts(user.getCurrentAccounts());
            }
            if (user.getDerivadaAccount() == 0) {
                existingUser.setDerivadaAccount(user.getDerivadaAccount());
            }
            if (user.getPayrollAccount() == 0) {
                existingUser.setPayrollAccount(user.getPayrollAccount());
            }
            if (user.getJuniorAccount() == 0) {
                existingUser.setJuniorAccount(user.getJuniorAccount());
            }
            if (user.getMasParticularAccount() == 0) {
                existingUser.setMasParticularAccount(user.getMasParticularAccount());
            }
            if (user.getParticularAccount() == 0) {
                existingUser.setParticularAccount(user.getParticularAccount());
            }
            if (user.getParticularPlusAccount() == 0) {
                existingUser.setParticularPlusAccount(user.getParticularPlusAccount());
            }
            if (user.getShortTermDeposits() == 0) {
                existingUser.setShortTermDeposits(user.getShortTermDeposits());
            }
            if (user.getMediumTermDeposits() == 0) {
                existingUser.setMediumTermDeposits(user.getMediumTermDeposits());
            }
            if (user.getLongTermDeposits() == 0) {
                existingUser.setLongTermDeposits(user.getLongTermDeposits());
            }
            if (user.getEAccount() == 0) {
                existingUser.setEAccount(user.getEAccount());
            }
            if (user.getFunds() == 0) {
                existingUser.setFunds(user.getFunds());
            }
            if (user.getMortgage() == 0) {
                existingUser.setMortgage(user.getMortgage());
            }
            if (user.getPensions() == 0) {
                existingUser.setPensions(user.getPensions());
            }
            if (user.getLoans() == 0) {
                existingUser.setLoans(user.getLoans());
            }
            if (user.getTaxes() == 0) {
                existingUser.setTaxes(user.getTaxes());
            }
            if (user.getCreditCard() == 0) {
                existingUser.setCreditCard(user.getCreditCard());
            }
            if (user.getSecurities() == 0) {
                existingUser.setSecurities(user.getSecurities());
            }
            if (user.getHomeAccount() == 0) {
                existingUser.setHomeAccount(user.getHomeAccount());
            }
            if (user.getPayroll() == 0) {
                existingUser.setPayroll(user.getPayroll());
            }
            if (user.getPensionsTwo() == 0) {
                existingUser.setPensionsTwo(user.getPensionsTwo());
            }
            if (user.getDirectDebit() == 0) {
                existingUser.setDirectDebit(user.getDirectDebit());
            }
            if (user.getBalance() == 0) {
                existingUser.setBalance(user.getBalance());
            }
            if (user.getTransactions() != null) {
                existingUser.setTransactions(user.getTransactions());
            }

            return userRepo.save(existingUser);
        });
    }

    public Mono<User> insert(User user) {
        log.info("Inserting new user: {}", user);
        return userRepo.save(user);
    }

    public Mono<Void> delete(String id) {
        log.info("Deleting user by ID: {}", id);
        return userRepo.deleteById(id);
    }

    public Mono<User> addTransaction(String userId, Transaction transaction) {
        log.info("Adding transaction for user ID: {}", userId);
        // Set the timestamp to the current date and time with year, month, day, hour, and minute
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        transaction.setTimestamp(LocalDateTime.now().format(formatter));

        return userRepo.findById(userId).flatMap(user -> {
            if (user.getTransactions() == null) {
                user.setTransactions(new ArrayList<>());
            }

            if (user.getTransactions().add(transaction)) {
                if (transaction.getType().equals("depot")) {
                    log.info("Depositing amount: {}", transaction.getAmount());
                    user.setBalance(user.getBalance() + transaction.getAmount());
                } else if (transaction.getType().equals("retrait")) {
                    log.info("Withdrawing amount: {}", transaction.getAmount());
                    user.setBalance(user.getBalance() - transaction.getAmount());
                }
            }
            return userRepo.save(user);
        }).flatMap(user -> transactionService.insert(transaction).then(Mono.just(user)));
    }

    public Mono<User> deleteTransaction(String userId, String transactionId) {
        log.info("Deleting transaction with ID: {} for user ID: {}", transactionId, userId);
        return userRepo.findById(userId).flatMap(user -> {
            user.setTransactions(user.getTransactions().stream()
                    .filter(t -> !t.getId().equals(transactionId))
                    .collect(Collectors.toList()));
            return userRepo.save(user);
        }).flatMap(user -> transactionService.delete(transactionId).then(Mono.just(user)));
    }

    public Mono<User> authenticate(String username, String password) {
        log.info("Authenticating user with username: {}", username);
        return userRepo.findByUsername(username)
                .flatMap(user -> {
                    if (password.equals(user.getPassword())) {
                        log.info("Authentication successful for username: {}", username);
                        return Mono.just(user);
                    } else {
                        log.info("Authentication failed for username: {}", username);
                        return Mono.error(new RuntimeException("Invalid credentials"));
                    }
                });
    }

    public Mono<Double> getBalance(String id) {
        log.info("Fetching balance for user ID: {}", id);
        return userRepo.findById(id)
                .map(User::getBalance);
    }

    public Flux<Transaction> getTransactionsByUserId(String userId) {
        log.info("Fetching transactions for user ID: {}", userId);
        return userRepo.findById(userId)
                .flatMapMany(user -> {
                    if (user.getTransactions() != null) {
                        return Flux.fromIterable(user.getTransactions());
                    } else {
                        return Flux.empty();
                    }
                });
    }
}
