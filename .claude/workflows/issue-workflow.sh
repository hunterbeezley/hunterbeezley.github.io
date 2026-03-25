#!/bin/bash

# GitHub Issue Workflow Helper Script
# This script provides utilities for the issue workflow

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPLETED_COUNT_FILE=".claude/workflows/.issue-count"
MODE_FILE=".claude/workflows/.mode"

# Initialize counter file if it doesn't exist
if [ ! -f "$COMPLETED_COUNT_FILE" ]; then
    echo "0" > "$COMPLETED_COUNT_FILE"
fi

# Initialize mode file if it doesn't exist
if [ ! -f "$MODE_FILE" ]; then
    echo "managed" > "$MODE_FILE"
fi

# Helper functions
get_count() {
    cat "$COMPLETED_COUNT_FILE"
}

increment_count() {
    local count=$(get_count)
    echo $((count + 1)) > "$COMPLETED_COUNT_FILE"
}

reset_count() {
    echo "0" > "$COMPLETED_COUNT_FILE"
}

get_mode() {
    cat "$MODE_FILE"
}

set_mode() {
    echo "$1" > "$MODE_FILE"
}

# Security audit function
security_audit() {
    echo -e "${BLUE}=== SECURITY AUDIT ===${NC}"
    echo "Checking for sensitive data..."

    local warnings=0

    # Check for secrets
    echo -n "Scanning for secrets... "
    if git diff main | grep -i -E "(password|secret|api[_-]?key|token|credential|private[_-]?key|auth)" > /dev/null 2>&1; then
        echo -e "${RED}⚠️  WARNING: Possible sensitive data detected${NC}"
        warnings=$((warnings + 1))
    else
        echo -e "${GREEN}✓${NC}"
    fi

    # Check for sensitive files
    echo -n "Checking sensitive files... "
    if git diff main --name-only | grep -E "(\.env|config\.json|secrets\.|credentials\.|private)" > /dev/null 2>&1; then
        echo -e "${RED}⚠️  WARNING: Security-sensitive files modified${NC}"
        warnings=$((warnings + 1))
    else
        echo -e "${GREEN}✓${NC}"
    fi

    # Check for unsafe patterns
    echo -n "Checking for unsafe code patterns... "
    if git diff main | grep -E "(eval\(|exec\(|innerHTML\s*=|dangerouslySetInnerHTML)" > /dev/null 2>&1; then
        echo -e "${RED}⚠️  WARNING: Potentially unsafe code patterns${NC}"
        warnings=$((warnings + 1))
    else
        echo -e "${GREEN}✓${NC}"
    fi

    # Check for internal URLs
    echo -n "Checking for internal URLs... "
    if git diff main | grep -E "https?://(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)" > /dev/null 2>&1; then
        echo -e "${RED}⚠️  WARNING: Internal URLs detected${NC}"
        warnings=$((warnings + 1))
    else
        echo -e "${GREEN}✓${NC}"
    fi

    # Check for console.log that might leak data
    echo -n "Checking for debug code... "
    if git diff main | grep -E "console\.(log|debug|info)\(" > /dev/null 2>&1; then
        echo -e "${YELLOW}ℹ️  INFO: console.log statements found (review for sensitive data)${NC}"
    else
        echo -e "${GREEN}✓${NC}"
    fi

    echo -e "${BLUE}=== AUDIT COMPLETE ===${NC}"

    if [ $warnings -gt 0 ]; then
        echo -e "${RED}❌ AUDIT FAILED: $warnings warning(s) found${NC}"
        echo -e "${RED}Cannot proceed with push until issues are resolved${NC}"
        return 1
    else
        echo -e "${GREEN}✅ AUDIT PASSED: No security issues detected${NC}"
        return 0
    fi
}

# Fetch and display issues
fetch_issues() {
    echo -e "${BLUE}Fetching open issues...${NC}"
    gh issue list --limit 100 --json number,title,state,labels --state open
}

# Check if 5-issue limit reached
check_limit() {
    local count=$(get_count)
    if [ "$count" -ge 5 ]; then
        echo -e "${YELLOW}=== 5 ISSUES COMPLETED ===${NC}"
        echo -e "${YELLOW}Issues completed this session: $count${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  PAUSING FOR USER CONFIRMATION${NC}"
        echo -e "${YELLOW}This prevents runaway tokens/development${NC}"
        echo ""
        echo "To continue: ./issue-workflow.sh continue"
        echo "To stop: ./issue-workflow.sh stop"
        exit 0
    fi
}

# Display current status
status() {
    local count=$(get_count)
    local mode=$(get_mode)
    echo -e "${BLUE}=== Workflow Status ===${NC}"
    echo "Mode: $mode"
    echo "Issues completed this session: $count"
    echo "Issues until next prompt: $((5 - count))"
}

# Commands
case "${1:-}" in
    init)
        echo "Initializing workflow..."
        mkdir -p .claude/workflows
        reset_count
        set_mode "${2:-managed}"
        echo "Workflow initialized in $(get_mode) mode"
        ;;

    set-mode)
        if [ -z "$2" ]; then
            echo "Usage: $0 set-mode [managed|vibe]"
            exit 1
        fi
        set_mode "$2"
        echo "Mode set to: $2"
        ;;

    fetch)
        fetch_issues
        ;;

    audit)
        if security_audit; then
            echo -e "${GREEN}Ready to push${NC}"
        else
            echo -e "${RED}Fix issues before pushing${NC}"
            exit 1
        fi
        ;;

    increment)
        increment_count
        local count=$(get_count)
        echo "Issue completed! Count: $count"
        check_limit
        ;;

    continue)
        reset_count
        echo -e "${GREEN}Counter reset. Continuing workflow...${NC}"
        ;;

    stop)
        reset_count
        echo -e "${GREEN}Workflow stopped. Counter reset.${NC}"
        ;;

    status)
        status
        ;;

    reset)
        reset_count
        echo "Counter reset to 0"
        ;;

    *)
        echo "GitHub Issue Workflow Helper"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  init [mode]      Initialize workflow (managed or vibe)"
        echo "  set-mode <mode>  Set workflow mode (managed or vibe)"
        echo "  fetch            Fetch and display open issues"
        echo "  audit            Run security audit on current changes"
        echo "  increment        Mark issue as completed and check limit"
        echo "  continue         Reset counter and continue workflow"
        echo "  stop             Stop workflow and reset counter"
        echo "  status           Show current workflow status"
        echo "  reset            Reset completed issue counter"
        echo ""
        echo "Current status:"
        status
        ;;
esac
