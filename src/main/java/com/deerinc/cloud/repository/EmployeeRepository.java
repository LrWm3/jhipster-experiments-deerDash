package com.deerinc.cloud.repository;

import com.deerinc.cloud.domain.Employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Employee entity.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "select distinct employee from Employee employee left join fetch employee.managers",
        countQuery = "select count(distinct employee) from Employee employee")
    Page<Employee> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct employee from Employee employee left join fetch employee.managers")
    List<Employee> findAllWithEagerRelationships();

    @Query("select employee from Employee employee left join fetch employee.managers where employee.id =:id")
    Optional<Employee> findOneWithEagerRelationships(@Param("id") Long id);
}
