import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useCharacter } from '../../api/queries/queries'

const Character = () => {
    const { data, isPending } = useCharacter()
    const maxXp = 100
    const lvl = data?.xp ? Math.floor(data.xp / maxXp) : 0
    const currentExp = data?.xp ? data.xp % maxXp : 0
    const xpPercent = (currentExp / maxXp) * 100

    const xpAnim = useRef(new Animated.Value(0)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(xpAnim, {
                toValue: xpPercent,
                damping: 20,
                stiffness: 120,
                useNativeDriver: false,
            }),
        ]).start()
    }, [xpPercent])

    const xpBarWidth = xpAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    if (isPending) {
        return (
            <View style={styles.card}>
                <View style={styles.skeletonRow}>
                    <View style={styles.skeletonAvatar} />
                    <View style={styles.skeletonTextBlock}>
                        <View style={styles.skeletonLine} />
                        <View style={[styles.skeletonLine, { width: '50%' }]} />
                    </View>
                </View>
                <View style={styles.skeletonBar} />
            </View>
        )
    }

    return (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            {/* Header row */}
            <View style={styles.headerRow}>
                

                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>
                        {data?.name ?? 'Unknown'}
                    </Text>
                    <View style={styles.levelChip}>
                        <Text style={styles.levelChipText}>Уровень {lvl}</Text>
                    </View>
                </View>

                <View style={styles.xpPill}>
                    <Text style={styles.xpPillValue}>{currentExp}</Text>
                    <Text style={styles.xpPillMax}>/{maxXp} XP</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* XP progress */}
            <View style={styles.xpSection}>
                <View style={styles.xpLabelRow}>
                    <Text style={styles.xpLabel}>Очки опыта</Text>
                    <Text style={styles.xpPercent}>{Math.round(xpPercent)}%</Text>
                </View>

                <View style={styles.track}>
                    <Animated.View style={[styles.fill, { width: xpBarWidth }]} />
                </View>

                <Text style={styles.xpSub}>
                    {maxXp - currentExp} XP до уровня {lvl + 1}
                </Text>
            </View>
        </Animated.View>
    )
}

/* ── Material Design 3 colour tokens (light scheme) ─────────────── */
const PRIMARY     = '#6750A4'
const PRIMARY_CTR = '#EADDFF'
const ON_PRIMARY  = '#FFFFFF'
const SURFACE     = '#FFFBFE'
const SURFACE_VAR = '#E7E0EC'
const ON_SURFACE  = '#1C1B1F'
const ON_SURF_VAR = '#49454F'
const OUTLINE_VAR = '#E6E1E5'

const styles = StyleSheet.create({
    card: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 20,
        paddingVertical: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    },

    /* ── Header ── */
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: PRIMARY_CTR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '600',
        color: PRIMARY,
    },
    info: {
        flex: 1,
        gap: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: ON_SURFACE,
        letterSpacing: 0.15,
    },
    levelChip: {
        alignSelf: 'flex-start',
        backgroundColor: SURFACE_VAR,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    levelChipText: {
        fontSize: 12,
        fontWeight: '500',
        color: ON_SURF_VAR,
        letterSpacing: 0.4,
    },
    xpPill: {
        alignItems: 'flex-end',
    },
    xpPillValue: {
        fontSize: 20,
        fontWeight: '700',
        color: PRIMARY,
        letterSpacing: 0.15,
    },
    xpPillMax: {
        fontSize: 11,
        color: ON_SURF_VAR,
        letterSpacing: 0.4,
    },

    /* ── Divider ── */
    divider: {
        height: 1,
        backgroundColor: OUTLINE_VAR,
        marginVertical: 14,
    },

    /* ── XP section ── */
    xpSection: {
        gap: 6,
    },
    xpLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    xpLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: ON_SURF_VAR,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    xpPercent: {
        fontSize: 12,
        fontWeight: '600',
        color: PRIMARY,
        letterSpacing: 0.4,
    },
    track: {
        height: 8,
        backgroundColor: PRIMARY_CTR,
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: PRIMARY,
        borderRadius: 4,
    },
    xpSub: {
        fontSize: 11,
        color: ON_SURF_VAR,
        letterSpacing: 0.4,
    },

    /* ── Skeleton ── */
    skeletonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
    },
    skeletonAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: OUTLINE_VAR,
    },
    skeletonTextBlock: {
        flex: 1,
        gap: 8,
    },
    skeletonLine: {
        height: 14,
        backgroundColor: OUTLINE_VAR,
        borderRadius: 4,
        width: '75%',
    },
    skeletonBar: {
        height: 8,
        backgroundColor: OUTLINE_VAR,
        borderRadius: 4,
    },
})

export default Character