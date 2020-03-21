package com.deerinc.cloud.service.mapper;


import com.deerinc.cloud.domain.*;
import com.deerinc.cloud.service.dto.EmployeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class})
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {

    @Mapping(source = "department.id", target = "departmentId")
    EmployeeDTO toDto(Employee employee);

    @Mapping(target = "jobs", ignore = true)
    @Mapping(target = "removeJob", ignore = true)
    @Mapping(target = "removeManager", ignore = true)
    @Mapping(source = "departmentId", target = "department")
    @Mapping(target = "teamMembers", ignore = true)
    @Mapping(target = "removeTeamMember", ignore = true)
    Employee toEntity(EmployeeDTO employeeDTO);

    default Employee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
