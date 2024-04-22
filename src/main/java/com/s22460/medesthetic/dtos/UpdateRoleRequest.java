package com.s22460.medesthetic.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.s22460.medesthetic.utils.Role;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    Role role;
}
