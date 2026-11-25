(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root && typeof root === 'object') {
        root.BomberosHerramientas = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    // ===== 1. SIGNOS VITALES (DATOS POR GRUPO ETARIO) =====
    const VITAL_SIGNS_GROUPS = [
        {
            id: 'recien-nacido',
            tabLabel: '0-1 mes',
            title: 'Recién Nacido (0-1 mes)',
            rows: [
                { metric: 'FC (lpm)', normal: ['120-160'], urgencia: ['100-119', '161-180'], emergencia: ['<100', '>180'] },
                { metric: 'FR (rpm)', normal: ['30-50'], urgencia: ['25-29', '51-70'], emergencia: ['<25', '>70'] },
                { metric: 'PA Sist (mmHg)', normal: ['60-90'], urgencia: ['50-59', '91-110'], emergencia: ['<50', '>110'] },
                { metric: 'Temp (°C)', normal: ['36.5-37.5'], urgencia: ['36.0-36.4', '37.6-38.5'], emergencia: ['<36.0', '>38.5'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'lactante',
            tabLabel: '1-12 meses',
            title: 'Lactante (1-12 meses)',
            rows: [
                { metric: 'FC (lpm)', normal: ['100-150'], urgencia: ['80-99', '151-170'], emergencia: ['<80', '>170'] },
                { metric: 'FR (rpm)', normal: ['25-40'], urgencia: ['20-24', '41-55'], emergencia: ['<20', '>55'] },
                { metric: 'PA Sist (mmHg)', normal: ['70-100'], urgencia: ['60-69', '101-120'], emergencia: ['<60', '>120'] },
                { metric: 'Temp (°C)', normal: ['36.5-37.5'], urgencia: ['36.0-36.4', '37.6-38.5'], emergencia: ['<36.0', '>38.5'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'nino-pequeno',
            tabLabel: '1-3 años',
            title: 'Niño Pequeño (1-3 años)',
            rows: [
                { metric: 'FC (lpm)', normal: ['90-140'], urgencia: ['70-89', '141-160'], emergencia: ['<70', '>160'] },
                { metric: 'FR (rpm)', normal: ['20-30'], urgencia: ['15-19', '31-40'], emergencia: ['<15', '>40'] },
                { metric: 'PA Sist (mmHg)', normal: ['80-110'], urgencia: ['70-79', '111-130'], emergencia: ['<70', '>130'] },
                { metric: 'Temp (°C)', normal: ['36.5-37.5'], urgencia: ['36.0-36.4', '37.6-39.0'], emergencia: ['<36.0', '>39.0'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'nino',
            tabLabel: '4-12 años',
            title: 'Niño (4-12 años)',
            rows: [
                { metric: 'FC (lpm)', normal: ['75-120'], urgencia: ['60-74', '121-140'], emergencia: ['<60', '>140'] },
                { metric: 'FR (rpm)', normal: ['15-25'], urgencia: ['12-14', '26-35'], emergencia: ['<12', '>35'] },
                { metric: 'PA Sist (mmHg)', normal: ['90-120'], urgencia: ['80-89', '121-140'], emergencia: ['<80', '>140'] },
                { metric: 'Temp (°C)', normal: ['36.0-37.5'], urgencia: ['35.5-35.9', '37.6-39.0'], emergencia: ['<35.5', '>39.0'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'adolescente',
            tabLabel: '13-17 años',
            title: 'Adolescente (13-17 años)',
            rows: [
                { metric: 'FC (lpm)', normal: ['60-100'], urgencia: ['50-59', '101-120'], emergencia: ['<50', '>120'] },
                { metric: 'FR (rpm)', normal: ['12-20'], urgencia: ['10-11', '21-30'], emergencia: ['<10', '>30'] },
                { metric: 'PA Sist (mmHg)', normal: ['100-130'], urgencia: ['90-99', '131-150'], emergencia: ['<90', '>150'] },
                { metric: 'Temp (°C)', normal: ['36.0-37.5'], urgencia: ['35.5-35.9', '37.6-39.0'], emergencia: ['<35.5', '>39.0'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'adulto',
            tabLabel: '18-64 años',
            title: 'Adulto (18-64 años)',
            rows: [
                { metric: 'FC (lpm)', normal: ['60-100'], urgencia: ['50-59', '101-120'], emergencia: ['<50', '>120'] },
                { metric: 'FR (rpm)', normal: ['12-20'], urgencia: ['10-11', '21-25'], emergencia: ['<10', '>25'] },
                { metric: 'PA Sist (mmHg)', normal: ['100-140'], urgencia: ['90-99', '141-180'], emergencia: ['<90', '>180'] },
                { metric: 'PA Diast (mmHg)', normal: ['60-90'], urgencia: ['50-59', '91-110'], emergencia: ['<50', '>110'] },
                { metric: 'Temp (°C)', normal: ['36.0-37.5'], urgencia: ['35.0-35.9', '37.6-39.0'], emergencia: ['<35.0', '>39.0'] },
                { metric: 'SatO₂ (%)', normal: ['95-100'], urgencia: ['90-94'], emergencia: ['<90'] }
            ]
        },
        {
            id: 'adulto-mayor',
            tabLabel: '65+ años',
            title: 'Adulto Mayor (65+ años)',
            rows: [
                { metric: 'FC (lpm)', normal: ['60-100'], urgencia: ['50-59', '101-120'], emergencia: ['<50', '>120'] },
                { metric: 'FR (rpm)', normal: ['12-25'], urgencia: ['10-11', '26-30'], emergencia: ['<10', '>30'] },
                { metric: 'PA Sist (mmHg)', normal: ['110-150'], urgencia: ['90-109', '151-180'], emergencia: ['<90', '>180'] },
                { metric: 'PA Diast (mmHg)', normal: ['60-90'], urgencia: ['50-59', '91-110'], emergencia: ['<50', '>110'] },
                { metric: 'Temp (°C)', normal: ['36.0-37.5'], urgencia: ['35.0-35.9', '37.6-38.5'], emergencia: ['<35.0', '>38.5'] },
                { metric: 'SatO₂ (%)', normal: ['92-100'], urgencia: ['88-91'], emergencia: ['<88'] }
            ]
        }
    ];

    function getVitalSignsGroup(id) {
        return VITAL_SIGNS_GROUPS.find(g => g.id === id) || null;
    }

    // ===== 2. ESCALA DE GLASGOW (LÓGICA PURA) =====
    function evaluateGlasgow(scores) {
        const ocular = Number(scores && scores.ocular) || 0;
        const verbal = Number(scores && scores.verbal) || 0;
        const motora = Number(scores && scores.motora) || 0;

        if (!ocular || !verbal || !motora) {
            return {
                complete: false,
                ocular,
                verbal,
                motora,
                total: null,
                level: null,
                severityClass: null,
                actions: []
            };
        }

        const total = ocular + verbal + motora;
        let level;
        let severityClass;
        let actions;

        if (total >= 13) {
            level = 'Leve';
            severityClass = 'tool-severity-leve';
            actions = [
                'Monitoreo cada 30 min',
                'Mantener vía aérea',
                'Evaluación neurológica'
            ];
        } else if (total >= 9) {
            level = 'Moderado';
            severityClass = 'tool-severity-moderado';
            actions = [
                'Monitoreo cada 15 min',
                'Asegurar vía aérea',
                'Traslado urgente'
            ];
        } else {
            level = 'Severo';
            severityClass = 'tool-severity-severo';
            actions = [
                'TRASLADO INMEDIATO',
                'Manejo avanzado vía aérea',
                'Soporte ventilatorio',
                'Acceso vascular'
            ];
        }

        return {
            complete: true,
            ocular,
            verbal,
            motora,
            total,
            level,
            severityClass,
            actions
        };
    }

    // ===== 3. CONVERSOR DE UNIDADES (LÓGICA PURA) =====
    function parseNumericInput(raw) {
        if (raw === '' || raw === null || raw === undefined) return null;
        const num = parseFloat(raw);
        return Number.isFinite(num) ? num : null;
    }

    function convertPresionValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { psi: '', bar: '', kpa: '', mh2o: '' };

        let psiValue = 0;
        if (from === 'psi') psiValue = val;
        else if (from === 'bar') psiValue = val * 14.5038;
        else if (from === 'kpa') psiValue = val * 0.145038;
        else if (from === 'mh2o') psiValue = val * 1.42233;

        return {
            psi: psiValue.toFixed(2),
            bar: (psiValue * 0.0689476).toFixed(2),
            kpa: (psiValue * 6.89476).toFixed(2),
            mh2o: (psiValue * 0.703069).toFixed(2)
        };
    }

    function convertDistanciaValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { metros: '', pies: '', pulgadas: '', cm: '' };

        let metrosValue = 0;
        if (from === 'metros') metrosValue = val;
        else if (from === 'pies') metrosValue = val * 0.3048;
        else if (from === 'pulgadas') metrosValue = val * 0.0254;
        else if (from === 'cm') metrosValue = val * 0.01;

        return {
            metros: metrosValue.toFixed(2),
            pies: (metrosValue * 3.28084).toFixed(2),
            pulgadas: (metrosValue * 39.3701).toFixed(2),
            cm: (metrosValue * 100).toFixed(2)
        };
    }

    function convertAreaValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { m2: '', ft2: '', hectareas: '' };

        let m2Value = 0;
        if (from === 'm2') m2Value = val;
        else if (from === 'ft2') m2Value = val * 0.092903;
        else if (from === 'hectareas') m2Value = val * 10000;

        return {
            m2: m2Value.toFixed(2),
            ft2: (m2Value * 10.7639).toFixed(2),
            hectareas: (m2Value * 0.0001).toFixed(4)
        };
    }

    function convertVolumenValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { litros: '', galones: '', m3: '' };

        let litrosValue = 0;
        if (from === 'litros') litrosValue = val;
        else if (from === 'galones') litrosValue = val * 3.78541;
        else if (from === 'm3') litrosValue = val * 1000;

        return {
            litros: litrosValue.toFixed(2),
            galones: (litrosValue * 0.264172).toFixed(2),
            m3: (litrosValue * 0.001).toFixed(3)
        };
    }

    function convertPesoValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { kg: '', lb: '', gramos: '' };

        let kgValue = 0;
        if (from === 'kg') kgValue = val;
        else if (from === 'lb') kgValue = val * 0.453592;
        else if (from === 'gramos') kgValue = val * 0.001;

        return {
            kg: kgValue.toFixed(2),
            lb: (kgValue * 2.20462).toFixed(2),
            gramos: (kgValue * 1000).toFixed(0)
        };
    }

    function convertFuerzaValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { newton: '', kgf: '', lbf: '' };

        let newtonValue = 0;
        if (from === 'newton') newtonValue = val;
        else if (from === 'kgf') newtonValue = val * 9.80665;
        else if (from === 'lbf') newtonValue = val * 4.44822;

        return {
            newton: newtonValue.toFixed(2),
            kgf: (newtonValue * 0.101972).toFixed(2),
            lbf: (newtonValue * 0.224809).toFixed(2)
        };
    }

    function convertTempValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { celsius: '', fahrenheit: '', kelvin: '' };

        let celsiusValue = 0;
        if (from === 'celsius') celsiusValue = val;
        else if (from === 'fahrenheit') celsiusValue = ((val - 32) * 5) / 9;
        else if (from === 'kelvin') celsiusValue = val - 273.15;

        return {
            celsius: celsiusValue.toFixed(1),
            fahrenheit: ((celsiusValue * 9) / 5 + 32).toFixed(1),
            kelvin: (celsiusValue + 273.15).toFixed(1)
        };
    }

    function convertCaudalValues(from, rawValue) {
        const val = parseNumericInput(rawValue);
        if (val === null) return { lpm: '', gpm: '', ls: '', m3s: '' };

        let lpmValue = 0;
        if (from === 'lpm') lpmValue = val;
        else if (from === 'gpm') lpmValue = val * 3.78541;
        else if (from === 'ls') lpmValue = val * 60;
        else if (from === 'm3s') lpmValue = val * 60000;

        return {
            lpm: lpmValue.toFixed(2),
            gpm: (lpmValue * 0.264172).toFixed(2),
            ls: (lpmValue / 60).toFixed(2),
            m3s: (lpmValue / 60000).toFixed(5)
        };
    }

    function calculateOxygenDuration(presionRaw, factorRaw, flujoRaw) {
        const presion = parseNumericInput(presionRaw);
        const factor = parseNumericInput(factorRaw);
        const flujo = parseNumericInput(flujoRaw);

        if (presion === null || factor === null || flujo === null || flujo <= 0 || presion < 0 || factor < 0) {
            return '';
        }
        return ((presion * factor) / flujo).toFixed(1);
    }

    // ===== 4. CONTROLADORES DOM (SOLO EN NAVEGADOR) =====
    const CONVERTER_MAP = {
        presion: { fn: convertPresionValues, fields: ['psi', 'bar', 'kpa', 'mh2o'] },
        distancia: { fn: convertDistanciaValues, fields: ['metros', 'pies', 'pulgadas', 'cm'] },
        area: { fn: convertAreaValues, fields: ['m2', 'ft2', 'hectareas'] },
        volumen: { fn: convertVolumenValues, fields: ['litros', 'galones', 'm3'] },
        peso: { fn: convertPesoValues, fields: ['kg', 'lb', 'gramos'] },
        fuerza: { fn: convertFuerzaValues, fields: ['newton', 'kgf', 'lbf'] },
        temperatura: { fn: convertTempValues, fields: ['celsius', 'fahrenheit', 'kelvin'] },
        caudal: { fn: convertCaudalValues, fields: ['lpm', 'gpm', 'ls', 'm3s'] }
    };

    let glasgowState = { ocular: 0, verbal: 0, motora: 0 };

    function renderVitalSignsTable(groupId) {
        if (typeof document === 'undefined') return;
        const group = getVitalSignsGroup(groupId);
        if (!group) return;

        document.querySelectorAll('#bspanel-tool-signos .tool-age-btn').forEach(btn => {
            const active = btn.dataset.age === groupId;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        const titleEl = document.getElementById('sv-active-title');
        const tbodyEl = document.getElementById('sv-table-body');
        if (!titleEl || !tbodyEl) return;

        titleEl.textContent = group.title;
        tbodyEl.textContent = '';

        group.rows.forEach(row => {
            const tr = document.createElement('tr');

            const tdMetric = document.createElement('td');
            tdMetric.textContent = row.metric;
            tr.appendChild(tdMetric);

            const cols = [
                { values: row.normal, cls: 'sv-badge sv-normal' },
                { values: row.urgencia, cls: 'sv-badge sv-warning' },
                { values: row.emergencia, cls: 'sv-badge sv-danger' }
            ];

            cols.forEach(col => {
                const td = document.createElement('td');
                const badge = document.createElement('span');
                badge.className = col.cls;
                col.values.forEach((line, idx) => {
                    if (idx > 0) badge.appendChild(document.createElement('br'));
                    badge.appendChild(document.createTextNode(line));
                });
                td.appendChild(badge);
                tr.appendChild(td);
            });

            tbodyEl.appendChild(tr);
        });
    }

    function updateGlasgowDom() {
        if (typeof document === 'undefined') return;
        const res = evaluateGlasgow(glasgowState);

        const ocularEl = document.getElementById('gcs-ocular');
        const verbalEl = document.getElementById('gcs-verbal');
        const motoraEl = document.getElementById('gcs-motora');
        const totalEl = document.getElementById('gcs-total');
        const severityEl = document.getElementById('gcs-severity');
        const actionsWrap = document.getElementById('gcs-actions');
        const actionsList = document.getElementById('gcs-actions-list');

        if (!ocularEl || !verbalEl || !motoraEl || !totalEl) return;

        ocularEl.textContent = res.ocular || '-';
        verbalEl.textContent = res.verbal || '-';
        motoraEl.textContent = res.motora || '-';

        if (res.complete) {
            totalEl.textContent = String(res.total);
            if (severityEl) {
                severityEl.textContent = res.level;
                severityEl.className = 'tool-severity ' + res.severityClass;
                severityEl.hidden = false;
            }
            if (actionsWrap && actionsList) {
                actionsList.textContent = '';
                res.actions.forEach(act => {
                    const li = document.createElement('li');
                    li.textContent = act;
                    actionsList.appendChild(li);
                });
                actionsWrap.hidden = false;
            }
        } else {
            totalEl.textContent = '-';
            if (severityEl) severityEl.hidden = true;
            if (actionsWrap) actionsWrap.hidden = true;
        }
    }

    function selectGlasgow(type, value, btnEl) {
        if (typeof document === 'undefined') return;
        const group = btnEl && btnEl.closest('.gcs-group');
        if (group) {
            group.querySelectorAll('.gcs-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.setAttribute('aria-pressed', 'false');
            });
        }
        if (btnEl) {
            btnEl.classList.add('selected');
            btnEl.setAttribute('aria-pressed', 'true');
        }
        glasgowState[type] = Number(value) || 0;
        updateGlasgowDom();
    }

    function resetGlasgow() {
        glasgowState = { ocular: 0, verbal: 0, motora: 0 };
        if (typeof document !== 'undefined') {
            document.querySelectorAll('#bspanel-tool-glasgow .gcs-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.setAttribute('aria-pressed', 'false');
            });
        }
        updateGlasgowDom();
    }

    function handleConverterInput(category, fromField) {
        if (typeof document === 'undefined') return;
        const config = CONVERTER_MAP[category];
        if (!config) return;

        const sourceEl = document.getElementById('conv-' + fromField);
        if (!sourceEl) return;

        const results = config.fn(fromField, sourceEl.value);
        config.fields.forEach(field => {
            if (field === fromField) return;
            const targetEl = document.getElementById('conv-' + field);
            if (targetEl) targetEl.value = results[field];
        });
    }

    function handleOxygenCalculate() {
        if (typeof document === 'undefined') return;
        const psiEl = document.getElementById('conv-oxPsi');
        const factorEl = document.getElementById('conv-oxFactor');
        const flujoEl = document.getElementById('conv-oxFlujo');
        const duracionEl = document.getElementById('conv-oxDuracion');
        if (!psiEl || !factorEl || !flujoEl || !duracionEl) return;

        duracionEl.value = calculateOxygenDuration(psiEl.value, factorEl.value, flujoEl.value);
    }

    function filterConverterCategory(categoryId) {
        if (typeof document === 'undefined') return;
        document.querySelectorAll('#bspanel-tool-conversor .conv-cat-btn').forEach(btn => {
            const active = btn.dataset.cat === categoryId;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        document.querySelectorAll('#bspanel-tool-conversor .conv-card').forEach(card => {
            const visible = categoryId === 'todas' || card.dataset.cat === categoryId;
            card.hidden = !visible;
        });
    }

    function initHerramientasUI() {
        if (typeof document === 'undefined') return;
        renderVitalSignsTable('adulto');
        updateGlasgowDom();
        filterConverterCategory('todas');
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHerramientasUI);
        } else {
            initHerramientasUI();
        }
    }

    return {
        VITAL_SIGNS_GROUPS,
        getVitalSignsGroup,
        evaluateGlasgow,
        convertPresionValues,
        convertDistanciaValues,
        convertAreaValues,
        convertVolumenValues,
        convertPesoValues,
        convertFuerzaValues,
        convertTempValues,
        convertCaudalValues,
        calculateOxygenDuration,
        renderVitalSignsTable,
        selectGlasgow,
        resetGlasgow,
        handleConverterInput,
        handleOxygenCalculate,
        filterConverterCategory,
        initHerramientasUI
    };
});
