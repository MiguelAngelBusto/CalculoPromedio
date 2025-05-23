function formatCurrency(value) {
    const number = parseFloat(value);
    if (isNaN(number)) return '';
    return '$' + number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function getRawValue(formattedValue) {
    return parseFloat(formattedValue.replace(/[^0-9.]/g, '')) || 0;
}

function setupFormattedInput(id) {
    const input = document.getElementById(id);

    // Permitir solo números y un punto decimal mientras se escribe
    input.addEventListener('input', () => {
        let cleaned = input.value.replace(/[^0-9.]/g, '');

        // Limitar a un solo punto decimal
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        input.value = cleaned;
        calcular();
    });

    // Al salir del input, aplicar el formato final con $
    input.addEventListener('blur', () => {
        const number = parseFloat(input.value);
        if (!isNaN(number)) {
            input.value = formatCurrency(number);
        } else {
            input.value = ''; // Si no es número, limpiar
        }
    });

    // Al enfocar, eliminar el formato para editar fácilmente
    input.addEventListener('focus', () => {
        const raw = getRawValue(input.value);
        input.value = raw === 0 ? '' : raw.toString();
    });

    // Al presionar Enter, salir del input (quitar foco)
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            input.blur();
        }
    });
}


function calcular() {
    const sueldo = getRawValue(document.getElementById("sueldo").value);
    const csoc = getRawValue(document.getElementById("csoc").value);

    const subtotal = sueldo + csoc;
    document.getElementById("subtotal_laboral").innerText = subtotal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Calcular el 8.33% del subtotal
    const sac_prop = subtotal * 0.0833;
    document.getElementById("sac_prop").innerText = sac_prop.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Calcular COSTO LAB. TOTAL = subtotal + sac_prop
    const costo_total = subtotal + sac_prop;
    document.getElementById("costo_total").innerText = costo_total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Calcular INCREMENTO (42.5%)
    const incremento = costo_total * 0.42857142857143;
    document.getElementById("incremento").innerText = incremento.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Calcular TOTAL = costo_total + incremento
    const total = costo_total + incremento;
    document.getElementById("total").innerText = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

// Inicializar inputs con comportamiento especial
setupFormattedInput("sueldo");
setupFormattedInput("csoc");
setupFormattedInput("aporte_estatal");